const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async(event, context) => {
  try {
    const data = JSON.parse(event.body)
    console.log('Function `redirect` invoked')
    console.log('Redirect Code:', data.code)

    const query = await client.query(
      q.Select('data', q.Get(q.Match(q.Index('redirect_by_code'), data.code)))
    )

    const { destination } = query;

    const response = {
      statusCode: 302,
      headers: {
        Location: destination
      }
    }

    return response;
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        Location: process.env.URL
      }
    }
  }
}