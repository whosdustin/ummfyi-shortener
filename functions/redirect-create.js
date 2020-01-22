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
    let shortURL
    let newCode
    let redirect = JSON.parse(event.body)
    console.log('Function redirect-create invoked', redirect)

    const codeExists = async (code) => {
      try {
        await client.query(
          q.Select('data',
            q.Get(q.Match(q.Index('redirect_by_code'), code))
          )
        )
        return true
      } catch (error) {
        return false
      }
    }
    
    const generateHash = async () => {
      const hash = new Hashids()
      const number = Math.round(new Date().getTime() / 100)
      const code = hash.encode(number)

      const exists = await codeExists(code)

      if (!exists) return code
      // Gerenate hash until one doesn't exist.
      // This should rarely be fired a second time.
      generateHash()
    }

    if (!redirect.code) {
      newCode = await generateHash()
      redirect.code = newCode
    } else {
      const usedCode = await codeExists(redirect.code)
      console.log('usedCode exists', usedCode)
      if (usedCode) {
        return {
          statusCode: 200,
          body: body(`<b>CODE:</b> <i>${redirect.code}</i> already exists.`, null, null, false)
        }
      }
    }

    if (redirect.destination.indexOf('://') == -1) {
      redirect.destination = `https://${redirect.destination}`
    }

    shortURL = `${rootURL}${redirect.code}`
    redirect = {
      ...redirect,
      redirect: shortURL
    }

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
      body: body(`URL shrunk to ${shortURL}`, redirect)
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: body('', null, error)
    }
  }
}