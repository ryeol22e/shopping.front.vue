import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import main from './main'
import member from './member'
import display from './display'
import product from './product'
import error from './error'


const routes = [
  ...error,
  ...main,
  ...member,
  ...display,
  ...product,
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=> {
  next();
});

router.afterEach((to, from)=> {
  nextTick(()=> {
    document.title = 'shopping'.concat(to.meta.title!==undefined ? ' | '.concat(to.meta.title) : '');
  })
})

export default router
