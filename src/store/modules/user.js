import api from '@/plugins/api.js'
import { getToken, setToken, removeToken, getName, setName } from '@/utils/auth'
// import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    avatar: '',
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      api
        .api('user/register', { username: username, password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_NAME', username)
          setName(username)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      api
        .api('user/login', { username: username, password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_NAME', username)
          setName(username)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ commit, _ }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
