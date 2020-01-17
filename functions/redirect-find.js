const faunadb = require('faunadb')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    let redirect
    const data = JSON.parse(event.body)
    console.log('Function `redirect-find` invoked')
    console.log('Find Code', data.code)

    const response = await client.query(
      q.Select('data', q.Get(q.Match(q.Index('redirect_by_code'), data.code)))
    )
    
    console.log('Found', response)
    redirect = response

    return {
      statusCode: 200,
      body: body('Found', redirect)
    }

  } catch (error) { 
    console.log('Found 0 Refs', error)
    return {
      statusCode: 400,
      body: body('', null, error, false)
    }
  }
}