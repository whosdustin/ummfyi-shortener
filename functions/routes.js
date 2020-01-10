const request = require('request-promise-native')
const { FORM_API } = require('./utils/config')

exports.handler = async (event, context) => {
  try {
    const options = {
      uri: FORM_API,
      json: true
    }
    const response = await request(options)

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error })
    }
  }
}