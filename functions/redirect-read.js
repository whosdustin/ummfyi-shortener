const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    console.log('Function `redirect-read` invoked')
    
    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('redirects_by_userid'), body.userid)
        ),
        q.Lambda(
          'redirect',
          q.Get(q.Var('redirect'))
        )
      )
    )

    const redirectRefs = response.data
    console.log('Redirect refs', redirectRefs)
    console.log(`${redirectRefs.length} redirect(s) found`)

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, redirects: redirectRefs })
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: error })
    }
  }
}