// Api methods to call functions

const create = async (data) => {
  const response = await fetch('/.netlify/functions/redirect-create', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response.json()
}

export default {
  create: create
}