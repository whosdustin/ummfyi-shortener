const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    let data = JSON.parse(event.body)
    console.log('Function submit-invite invoked', data)

    const emailInvite = {
      data: data
    }

    await client.query(
      q.Create(q.Collection('invites'), emailInvite)
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        ok: true,
        msg: `Invite submitted for ${data.email}`
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        ok: false,
        error: error
      })
    }
  }
}