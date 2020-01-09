const request = require('request-promise-native')

exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code

    const url = `https://api.netlify.com/api/v1/forms/${process.env.ROUTES_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`

    const options = {
      uri: url,
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
    console.log(error) 
    return {
      statusCode: 200,
      body: error
    }
  }
}