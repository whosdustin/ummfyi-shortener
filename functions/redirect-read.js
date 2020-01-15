const faunadb = require('faunadb')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)
    console.log('Function `redirect-read` invoked')
    
    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('redirects_by_userid'), data.userid)
        ),
        q.Lambda(
          'redirect',
          q.Get(q.Var('redirect'))
        )
      )
    )

    const redirects = response.data
    console.log(`${redirects.length} Redirect(s) found`)

    return {
      statusCode: 200,
      body: body('', { redirects: redirects })
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: error })
    }
  }
}