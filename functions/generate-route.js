const request = require('request-promise-native')
const Hashids = require('hashids/cjs')

exports.handler = async (event, context) => {
  try {
    const rootURL = process.env.URL + '/'
    let destination = event.queryStringParameters.to

    // Generate code
    const hash = new Hashids()
    const number = Math.round(new Date().getTime() / 100)
    const code = hash.encode(number)

    if (destination.indexOf('://') == -1) {
      destination = `http://${destination}`
    }

    const payload = {
      'form-name': 'routes',
      destination,
      code,
      expires: ''
    }

    const options = {
      method: 'POST',
      uri: rootURL,
      form: payload
    }

    const response = await request(options)
    const body = await response

    return {
      statusCode: 200,
      body: JSON.stringify({ url: rootURL + code })
    }
  } catch (error) {
    console.log(error)
  }
}