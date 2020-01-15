const faunadb = require('faunadb')
const fetch = require('node-fetch')
const Hashids = require('hashids/cjs')
const body = require('./utils/callbackBody')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

const rootURL = process.env.URL + '/'

exports.handler = async (event, context) => {
  try {
    let redirect = JSON.parse(event.body)
    console.log('Function redirect-create invoked', redirect)

    const hash = new Hashids()
    const number = Math.round(new Date().getTime() / 100)
    const code = hash.encode(number)
    const redirectURL = rootURL + code

    if (redirect.destination.indexOf('://') == -1) {
      redirect.destination = `http://${redirect.destination}`
    }

    redirect = {...redirect, redirect: redirectURL, code }

    await client.query(
      q.Create(q.Collection('redirects'), { data: redirect })
    )

    // Fire a new build after submitting new redirect
    await fetch(`https://api.netlify.com/build_hooks/${process.env.BUILD_HOOKS_ID}`, {
      method: 'POST',
      body: {}
    })

    return {
      statusCode: 200,
      body: body(`URL shrunk to ${redirectURL}`, redirect)
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}