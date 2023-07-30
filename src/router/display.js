export default [
	{
		path: '/display/outer',
		name: 'Outer',
		component: () => import('@/views/display/Outer.vue'),
		meta: {
			title: 'OUTER',
		},
	},
	{
		path: '/display/top',
		name: 'Top',
		component: () => import('@/views/display/Top.vue'),
		meta: {
			title: 'TOP',
		},
	},
	{
		path: '/display/pants',
		name: 'Pants',
		component: () => import('@/views/display/Pants.vue'),
		meta: {
			title: 'Pants',
		},
	},
	{
		path: '/display/shoes',
		name: 'Shoes',
		component: () => import('@/views/display/Shoes.vue'),
		meta: {
			title: 'SHOES',
		},
	},
	{
		path: '/display/event',
		name: 'Event',
		component: () => import('@/views/display/Event.vue'),
		meta: {
			title: 'EVENT',
		},
	},
	{
		path: '/display/promotion',
		name: 'Promotion',
		component: () => import('@/views/display/Promotion.vue'),
		meta: {
			title: 'PROMOTION',
		},
	},
	{
		path: '/display/acc',
		name: 'Acc',
		component: () => import('@/views/display/Acc.vue'),
		meta: {
			title: 'ACC',
		},
	},
	{
		path: '/display/vip',
		name: 'Vip',
		component: () => import('@/views/display/Vip.vue'),
	},
];
