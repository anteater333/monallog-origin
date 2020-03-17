import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */`./views/MonallogHome.vue`)
    },
    {
      path: '/ch/:chId',
      name: 'channel',
      component: () => import(/* webpackChunkName: "channel" */`./views/MonallogChannel.vue`)
    },
    { // 404 not found
      path: '*',
      name: '404',
      component: () => import(`./views/MonallogNotFound.vue`)
    }
    /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue') // webpackChunkName: "about"
    }
    */
    // , { // temporary routing for development
    //   path: '/dev',
    //   name: 'dev',
    //   component: () => import(`./views/MonallogChannel.vue`)
    // }
  ]
})
