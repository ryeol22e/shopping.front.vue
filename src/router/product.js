export default [
	{
		path: '/product/:prdtNo',
		name: 'ProductDetail',
		component: () => import('@/views/product/ProductDetail.vue'),
	},
];
