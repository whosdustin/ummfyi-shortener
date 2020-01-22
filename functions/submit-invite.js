const faunadb = require('faunadb')
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_KEY)
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    let invite = JSON.parse(event.body)
    let invited = {email: null, invited: false};
    console.log('Function submit-invite invoked', invite)

    const queryInvite = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('invite_by_email'), invite.email)
        ),
        q.Lambda(
          'invite',
          q.Get(q.Var('invite'))
        )
      )
    )

    // If query returns with data
    if (queryInvite.data.length) {
      invited = queryInvite.data[0].data
    }

    if (invited.invited) {
      return {
        statusCode: 200,
        body: body('WAIT, Email has already been invited.', null, null, false)
      }
    }

    if (invited.email === invite.email) {
      return {
        statusCode: 200,
        body: body('SORRY, Email has already requested for an invite.', null, null, false)
      }
    }

    await client.query(
      q.Create(q.Collection('invites'), { data: invite })
    )

    const params = {
      'originator': process.env.PHONE_KEY,
      'recipients': [process.env.PHONE_KEY],
      'body': `[Invite Request - umm.fyi]\nEmail: ${invite.email}`
    };
    
    messagebird.messages.create(params, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });
    

    return {
      statusCode: 200,
      body: body(`Invite requested for ${invite.email}`)
    }
  } catch (error) {
    console.log('Function `submit-invite` error', error)
    return {
      statusCode: 500,
      body: body('', null, error, false)
    }
  }
}