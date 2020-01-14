const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
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

    const redirects = response.data
    
    return {
      statusCode: 200,
      body:JSON.stringify(redirects)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: error })
    }
  }
}