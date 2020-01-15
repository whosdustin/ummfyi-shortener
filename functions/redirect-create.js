const faunadb = require('faunadb')
const fetch = require('node-fetch')
const Hashids = require('hashids/cjs')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

const rootURL = process.env.URL + '/'

exports.handler = async (event, context) => {
  try {
    let data = JSON.parse(event.body)
    console.log('Function redirect-create invoked', data)

    const hash = new Hashids()
    const number = Math.round(new Date().getTime() / 100)
    const code = hash.encode(number)
    const redirect = rootURL + code

    if (data.destination.indexOf('://') == -1) {
      data.destination = `http://${data.destination}`
    }

    data = {...data, redirect, code }

    await client.query(
      q.Create(q.Collection('redirects'), { data: data })
    )

    // Fire a new build after submitting new redirect
    await fetch(`https://api.netlify.com/build_hooks/${process.env.BUILD_HOOKS_ID}`, {
      method: 'POST',
      body: {}
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data })
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}