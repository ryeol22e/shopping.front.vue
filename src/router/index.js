import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import useStoreMember from '@/store/useStoreMember'
import {useUtils} from '@/composables/useUtils'
import admin from './admin'
import member from './member'
import display from './display'
import product from './product'
import {api} from '@/composables/useAxios'


const routes = [
  {
		path : '/',
		name : 'Main',
		component : ()=> import('@/views/main/Main.vue'),
	},
  {
		path : '/:pathMatch(.*)*',
		redirect : to=> {
			return {name : 'Error', params : {errorType : '404'}};
		}
	},
	{
		path : '/error/:errorType',
		name : 'Error',
		component : ()=> import('@/views/common/CommonError.vue'),
		props : true,
		meta : {
			title : 'error :('
		}
	},
	...admin,
	...member,
	...display,
	...product,
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition)  {
	return {
		top : 0,
	};
  }
})

router.beforeEach((to, from, next)=> {
  const useMember = useStoreMember();
  const useCookie = useUtils().useCookie();
  const token = useCookie.getCookie('token');

  if(token!=='') {
		api.defaults.headers.common['Authorization'] = 'Bearer '.concat(token);
		api.defaults.headers.common['MemberId'] = localStorage.getItem('memberId');
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
  
  useMember.authCheck();
  
  next();
});

router.afterEach((to, from)=> {
  nextTick(()=> {
    document.title = 'shopping'.concat(to.meta.title!==undefined ? ' | '.concat(to.meta.title) : '');
  });
});

export default router
