import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {SETEQUIMENTSCOUNTS,SETLOGIN,SETLOGOUT} from './mutation-constant'
import {LOGIN,LOGOUT} from './actions-constant'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {
      isAuthenticated: false,
      token: null
    }
  },
  actions:{
    [LOGIN]({commit}, payload){
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('token', payload.token)
      commit(SETLOGIN, payload)
    },
    [LOGOUT]({commit}){
      localStorage.setItem('isAuthenticated', false)
      localStorage.setItem('token', null);
      commit(SETLOGOUT)
    }
  },
  mutations: {
    [SETEQUIMENTSCOUNTS] (state, value) {
      state.equipmentCounter = value
      localStorage.setItem('equipmentCounter', value)
    },
    [SETLOGIN] (state, payload) {
      state.user.isAuthenticated = true
      state.user.token = payload.token
    },
    [SETLOGOUT] (state){
      state.user.isAuthenticated = false
      state.user.token = null
    },
    initialiseStore (state) {
      if (localStorage.getItem('token')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('token') || '{}'))
        )
      }
    }
  },
  getters: {
    token (state) {
      return state.user.token
    },
    isAuthenticated (state) {
      return state.user.isAuthenticated
    }
  },
  plugins: [vuexLocal.plugin]
})