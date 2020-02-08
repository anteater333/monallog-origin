import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

/**
 * init VueSocektIO
 */
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:8081',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  // options are optional.
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
