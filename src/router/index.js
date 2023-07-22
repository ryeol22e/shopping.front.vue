import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin';
import display from './display';
import member from './member';
import product from './product';
import useStoreMember from '@/store/useStoreMember';

const routes = [
	{
		path: '/',
		name: 'Main',
		component: () => import('@/views/main/Main.vue'),
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
		component: () => import('@/views/common/CommonError.vue'),
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

router.beforeEach((to, from, next) => {
	useStoreMember().authCheck();
	next();
});

router.afterEach((to, from) => {
	nextTick(() => {
		document.title = 'shopping'.concat(to.meta.title !== undefined ? ' | '.concat(to.meta.title) : '');
	});
});

export default router;
