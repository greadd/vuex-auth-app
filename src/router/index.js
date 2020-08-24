import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //защита роутов
  const requireAuth = to.matched.some(record => record.meta.auth)
  const activeUser = JSON.parse(localStorage.getItem('user'))
  if (requireAuth && !activeUser) {
    //если страница требует авторизации и нет активного пользователя
    next('/login') //перенаправляем на страницу логина
  } else {
    next()
  }
})

export default router
