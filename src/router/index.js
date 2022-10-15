import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import useStoreMember from '../store/useStoreMember'
import {useUtilCookie} from '../assets/js/utils/useUtils'
import main from './main'
import member from './member'
import display from './display'
import product from './product'
import error from './error'
import axios from 'axios'


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
  const useMember = useStoreMember();
  const useCookie = useUtilCookie();
  const token = useCookie.getCookie('token');

  if(token!=='') {
		axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(token);
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
  
  useMember.authCheck();
  
  next();
});

router.afterEach((to, from)=> {
  nextTick(()=> {
    document.title = 'shopping'.concat(to.meta.title!==undefined ? ' | '.concat(to.meta.title) : '');
  })
})

export default router
