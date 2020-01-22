import fetch from "node-fetch"

const netlify = `/.netlify/functions/`
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

const remove = async (code) => {
  try {
    const response = await fetch(`${netlify}redirect-remove`, {
      method: 'POST',
      body: JSON.stringify({ code: code })
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

const find = async (code) => {
  try {
    const response = await fetch(`${netlify}redirect-find`, {
      method: 'POST',
      body: JSON.stringify({ code: code })
    })
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

const redirect = async (code) => {
  try {
    await fetch(`${netlify}redirect`, {
      method: 'POST',
      body: JSON.stringify({ code: code })
    })
    // return response.json()
  } catch (error) {
    console.log(error)
  }
}

const readAll = async (production) => {
  try {
    // Need full URL for Rollup build
    const URL = !production ? 'http://localhost:34567' : process.env.URL
    const response = await fetch(`${URL}${netlify}redirects-read-all`)
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
  find: find,
  redirect: redirect,
  readAll: readAll,
  readRedirects: readRedirects,
  remove: remove,
  invite: invite
}