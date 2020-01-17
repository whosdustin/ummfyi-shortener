const faunadb = require('faunadb')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

const rootURL = process.env.URL + '/'

exports.handler = async (event, context) => {
  try {
    let redirect
    const data = JSON.parse(event.body)

    const response = await client.query(
      q.Delete(
        q.Select('ref', 
        q.Get(q.Match(q.Index('redirect_by_code'), data.code)))
      )
    )
    redirect = response.data
    console.log('Delete', redirect)

    return {
      statusCode: 200,
      body: body(`Removed ${process.env.URL}/${data.code}`, redirect)
    }
  } catch (error) {
    console.log('Delete failed', error)
    return {
      statusCode: 400,
      body: body('', null, error, false)
    }

  }
}