import GoTrue from 'gotrue-js'

export const auth = new GoTrue({
  APIUrl: 'https://umm.fyi/.netlify/identity',
  audience: '',
  setCookie: false
});
