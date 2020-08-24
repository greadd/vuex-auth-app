import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {}
  },
  mutations: {
    setSnackbar(state, snackbar) {
      state.snackbar = snackbar
    }
  },
  actions: {
    setSnackbar({ commit }, snackbar) { //сообщения на страницах приложения
      snackbar.showing = true
      commit('setSnackbar', snackbar)
    }
  },
  modules: {
    auth
  },
  getters: {}
})
