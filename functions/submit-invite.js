const request = require('request-promise-native')

exports.handler = async (event, context) => {
  try {
    const rootURL = process.env.URL + '/'
    let email = event.queryStringParameters.email

    const formPost = {
      method: 'POST',
      uri: rootURL,
      form: {
        'form-name': 'invites',
        email
      }
    }

    await request(formPost)

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, msg: 'Form submitted' })
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error })
    }
  }
}