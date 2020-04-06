import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import '@/assets/css/nprogress.css'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */'./views/MonallogHome.vue')
        },
        {
            path: '/ch/:chId',
            name: 'channel',
            component: () => import(/* webpackChunkName: "channel" */'./views/MonallogChannel.vue')
        },
        { // 404 not found
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "404" */'./views/MonallogNotFound.vue')
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

router.beforeEach((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

router.onError((error) => {
    NProgress.done()
    alert(`예상치 못한 문제가 발생했습니다.\nanteater333@github로 문의주세요.\n${error}`)
})

export default router
