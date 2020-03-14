import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgFocus: false
  },
  mutations: {
    setBgFocus: function (state, payload) {
      state.bgFocus = payload.focus;
      return state.bgFocus;
    }
  },
  actions: {
    turnOnBg: function (context, payload) {
      context.commit('setBgFocus', {focus: true});
    },
    turnOffBg: function (context, payload) {
      context.commit('setBgFocus', {focus: false});
    }
  }
})
