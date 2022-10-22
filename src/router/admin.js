export default [
	{
		path : '/admin/',
		component : ()=> import('@/views/admin/AdminMain.vue'),
		children : [
			{
				path : 'dashboard',
				name : 'Dashboard',
				component : ()=> import('@/views/admin/DashBoard.vue'),
				meta : {
					title : 'dashboard'
				}
			},
			{
				path : 'order',
				name : 'Orders',
				component : ()=> import('@/views/admin/Orders.vue'),
				meta : {
					title : 'order',
				}
			},
			{
				path : 'product',
				name : 'AdminProduct',
				component : ()=> import('@/views/admin/AdminProduct.vue'),
				meta : {
					title : 'product',
				}
			},
		]
	}
]