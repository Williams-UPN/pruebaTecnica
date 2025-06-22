import { createRouter, createWebHistory } from 'vue-router'
import UsersList from '../views/UsersList.vue'
import UserDetail from '../views/UserDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList,
    meta: {
      title: 'Lista de Usuarios'
    }
  },
  {
    path: '/users/:id',
    name: 'UserDetail',
    component: UserDetail,
    props: true,
    meta: {
      title: 'Detalle del Usuario'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/users'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - CRUD Usuarios`
  }
  
  next()
})

export default router