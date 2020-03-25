import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bgFocus: false,
        bgImgUrl: ''
    },
    getters: {
        getBgFocus: function (state) {
            return state.bgFocus
        },
        getBgImgUrl: function (state) {
            return state.bgImgUrl
        }
    },
    mutations: {
        setBgFocus: function (state, payload) {
            state.bgFocus = payload.focus
            return state.bgFocus
        },
        setBgImgUrl: function (state, payload) {
            state.bgImgUrl = payload.url
            return state.bgImgUrl
        }
    },
    actions: {
        turnOnBg: function (context, payload) {
            context.commit('setBgFocus', { focus: true })
        },
        turnOffBg: function (context, payload) {
            context.commit('setBgFocus', { focus: false })
        },
        updateBgImg: function (context, payload) {
            context.commit('setBgImgUrl', { url: payload.url })
        }
    }
})
