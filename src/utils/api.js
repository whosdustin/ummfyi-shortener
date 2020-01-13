// Api methods to call functions
const netlify = '/.netlify/functions/'
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
  invite: invite
}