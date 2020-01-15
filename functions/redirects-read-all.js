const faunadb = require('faunadb')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    let redirects
    console.log('Function `redirect-all` invoked')

    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('all_redirects')
          )
        ),
        q.Lambda(
          'redirect',
          q.Get(q.Var('redirect'))
        )
      )
    )

    redirects = response.data
    
    return {
      statusCode: 200,
      body: body('', redirects)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: body('', null, error, false)
    }
  }
}