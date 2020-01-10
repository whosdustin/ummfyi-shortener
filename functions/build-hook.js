const request = require('request-promise-native')

exports.handler = async (event, context) => {
  try {
    await request({
      method: 'POST',
      uri: `https://api.netlify.com/build_hooks/${process.env.BUILD_HOOKS_ID}`
    })
    return {
      statusCode: 200
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error })
    }
  }
}