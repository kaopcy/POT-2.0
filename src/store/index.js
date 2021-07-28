import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    login: false,
  },
  mutations: {
    updateUsername( state , payload){
      state.username = payload;
    },
    updateLogin(state,payload){
      state.login = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
