function setToken(token) {
  localStorage.setItem('token', token)
}

function isLoggedIn() {
  return localStorage.token ? true : false
}

function getToken() {
  return localStorage.getItem('token')
}

function logOut() {
  localStorage.removeItem('token')
}

function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  getToken,
  isLoggedIn,
  logOut,
  getUserId
}