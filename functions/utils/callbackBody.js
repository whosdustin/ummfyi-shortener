function body(message, data = null, error = null, ok = true) {
  return JSON.stringify({
    ok: ok,
    message: message,
    error: error,
    data: data
  })
}

module.exports = body