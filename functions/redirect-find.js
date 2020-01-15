const faunadb = require('faunadb')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    console.log('Function `redirect-find` invoked')
    console.log(body.code)

    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('redirect_by_code'), body.code)
        ),
        q.Lambda(
          'redirect',
          q.Get(q.Var('redirect'))
        )
      )
    )
    
    console.log('Found', response.data[0])
    const redirect = response.data[0].data

    return {
      statusCode: 200,
      body: body('', {...redirect})
    }

  } catch (error) { 
    console.log('Found 0 Refs')
    return {
      statusCode: 400,
      body: body('', null, error, false)
    }
  }
}