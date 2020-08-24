import axios from 'axios'
const API_URL = 'http://emphasoft-test-assignment.herokuapp.com/'

export default {
  state: {
    token: localStorage.getItem('token') || '', //токен активного пользователя
    user: JSON.parse(localStorage.getItem('user')) || '' //активный пользователь
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, { ...user }) {
      state.user = { ...user }
    },
    logout(state) {
      state.user = ''
      state.token = ''
    }
  },
  actions: {
    async setToken({ commit }, { username, password }) {
      const resp = await axios.post(API_URL + 'api-token-auth/', {
        //запрос на получение токена
        username,
        password
      })
      const token = resp.data.token
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
      commit('setToken', token) // вызываем мутацию для сохранения токена в state
      localStorage.setItem('token', token) //сохраняем токен в local storage
    },

    async setUser({ commit }, { username }) {
      const resp = await axios.get(API_URL + 'api/v1/users/') //запрос на получение списка пользователей
      const user = resp.data.find(u => u.username === username) //находим пользователя, который пытается авторизоваться
      commit('setUser', user) // вызываем мутацию дял сохранения пользователя в state
      localStorage.setItem('user', JSON.stringify(user)) //сохраняем пользователя в local storage
    },

    async register({ commit }, { ...registrationData }) {
      //регистрируем пользователя
      const resp = await axios.post(
        API_URL + 'api/v1/users/',
        {
          ...registrationData
        },
        {
          headers: {
            Authorization: 'Token 91409365e795f2488d4035a896bf7d1dd210cd4b'
          }
        }
      )
      commit('setUser', resp.data) // вызываем мутацию для сохранения зарегистрированного пользователя в state
      localStorage.setItem('user', JSON.stringify(resp.data)) // сохраняем пользователя в local storage
    },
    async logout({ commit }) {
      localStorage.removeItem('token') //удаляем токен
      localStorage.removeItem('user') //удаляем пользователя
      delete axios.defaults.headers.common['Authorization']
      commit('logout') //вызываем мутацию для удаления пользователя и токена из state
    },

    async updateInfo({ commit, getters }, data) {
      const resp = await axios.patch(
        //запрос для изменения данных активного пользователя
        API_URL + `api/v1/users/${getters.user.id}/`,
        data,
        { headers: { Authorization: 'Token ' + getters.token } }
      )
      commit('setUser', resp.data) //вызываем мутацию для обновления данных активного пользователя
      localStorage.setItem('user', JSON.stringify(resp.data)) //сохраняем пользователя
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    user(state) {
      return state.user
    }
  }
}
