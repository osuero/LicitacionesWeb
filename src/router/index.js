import Vue from 'vue'
import VueRouter from 'vue-router'
import Archivos from '../views/archivos/archivos.vue'
import Inicio from '../views/Inicio/inicio.vue'
import login from '../views/login/login.vue'
import Store from '../store'
import Empresa from '../views/empresa/empresa.vue'
import Usuario from '../views/usuarios/perfil.vue'
import Licitaciones from '../views/licitaciones/licitaciones.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio,
    meta: {
      requiresAuth: true
    },
  },
 {
    path: '/perfil',
    name: 'perfil',
    component: Usuario,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/archivo',
    name: 'archivo',
    component: Archivos,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/licitaciones',
    name: 'licitaciones',
    component: Licitaciones,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: Empresa,
    meta: {
      requiresAuth: true
    },
  },{
    path: '/login',
    name: 'login',
    component: login
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.getters.isAuthenticated) {
        next()
      
    } else {
      next({ name: 'login' })
    }
  } else {
    next() 
  }
})
export default router