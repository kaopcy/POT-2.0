import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    login: false,
    learnScore: 0,
    testScore: 0,
  },
  mutations: {
    updateUsername( state , payload){
      state.username = payload;
    },
    updateLogin(state,payload){
      state.login = payload;
    },
    LearnScoreUp(state){
      state.learnScore = state.learnScore+1
    },
    updateTestScore(state , payload){
      state.testScore = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
