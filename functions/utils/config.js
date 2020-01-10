const FORM_API = `https://api.netlify.com/api/v1/forms/${process.env.ROUTES_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`



module.exports = { FORM_API }