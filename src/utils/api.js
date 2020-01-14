import fetch from "node-fetch"

const netlify = '/.netlify/functions/'
// Api methods to call functions
const create = async (data) => {
  try {
    const response = await fetch(`${netlify}redirect-create`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

const readRedirects = async (userid) => {
  try {
    const response = await fetch(`${netlify}redirect-read`, {
      method: 'POST',
      body: JSON.stringify({ userid: userid })
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

const invite = async (data) => {
  try {
    const response = await fetch(`${netlify}submit-invite`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export default {
  create: create,
  readRedirects: readRedirects,
  invite: invite
}