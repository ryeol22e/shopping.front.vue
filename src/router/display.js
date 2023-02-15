export default [
	{
		path: '/display/outer',
		component: () => import('@/views/display/Outer.vue'),
		meta: {
			title: 'OUTER',
		},
	},
	{
		path: '/display/top',
		component: () => import('@/views/display/Top.vue'),
		meta: {
			title: 'TOP',
		},
	},
	{
		path: '/display/pants',
		component: () => import('@/views/display/Pants.vue'),
		meta: {
			title: 'Pants',
		},
	},
	{
		path: '/display/shoes',
		component: () => import('@/views/display/Shoes.vue'),
		meta: {
			title: 'SHOES',
		},
	},
	{
		path: '/display/event',
		component: () => import('@/views/display/Event.vue'),
		meta: {
			title: 'EVENT',
		},
	},
	{
		path: '/display/promotion',
		component: () => import('@/views/display/Promotion.vue'),
		meta: {
			title: 'PROMOTION',
		},
	},
	{
		path: '/display/acc',
		component: () => import('@/views/display/Acc.vue'),
		meta: {
			title: 'ACC',
		},
	},
];
