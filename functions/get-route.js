const request = require('request-promise-native')
const { FORM_API } = require('./utils/config')

exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code

    const options = {
      uri: FORM_API,
      json: true
    }

    const response = await request(options)
    
    for (const route in response) {
      if (response[route].data.code === code) {
        const destination = response[route].data.destination
        console.log(`We searched for ${code} and we found ${destination}`)

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code,
            url: destination
          })
        }
      }
    }
  } catch (error) { 
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: false, msg: error })
    }
  }
}