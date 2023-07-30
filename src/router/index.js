import { useLoginProcess } from '@/composables/useRouterFunc';
import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin';
import display from './display';
import member from './member';
import product from './product';

const routes = [
	{
		path: '/',
		name: 'Main',
		component: () => import('@/views/Main.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: (to) => {
			return { name: 'Error', params: { errorType: '404' } };
		},
	},
	{
		path: '/error/:errorType',
		name: 'Error',
		component: () => import('@/views/Error.vue'),
		props: true,
		meta: {
			title: 'error :(',
		},
	},
	...admin,
	...member,
	...display,
	...product,
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			top: 0,
		};
	},
});

router.beforeEach(async (to, from, next) => {
	(await useLoginProcess(to)) ? next() : next('/login');
});

router.afterEach((to, from) => {
	nextTick(() => {
		document.title = 'shopping'.concat(to.meta.title !== undefined ? ' | '.concat(to.meta.title) : '');
	});
});

export default router;
