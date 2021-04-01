const TokenKey = 'luyh7_vue_study_token'
const NameKey = 'luyh7_vue_study_name'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function getName() {
  return localStorage.getItem(NameKey)
}

export function setName(token) {
  return localStorage.setItem(NameKey, token)
}

export function removeToken() {
  return localStorage.setItem(TokenKey, '')
}
