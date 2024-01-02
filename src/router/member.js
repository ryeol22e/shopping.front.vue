export default [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/member/Login.vue'),
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: () => import('@/views/member/SignUp.vue'),
	},
];
