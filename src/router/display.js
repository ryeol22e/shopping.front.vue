export default [
	{
		path : '/display/outer',
		components : ()=> import('@/views/display/Outer.vue'),
		meta : {
			title : 'OUTER',
		}
	},
	{
		path : '/display/top',
		components : ()=> import('@/views/display/Top.vue'),
		meta : {
			title : 'TOP',
		}
	},
	{
		path : '/display/pants',
		components : ()=> import('@/views/display/Pants.vue'),
		meta : {
			title : 'Pants',
		}
	},
	{
		path : '/display/shoes',
		components : ()=> import('@/views/display/Shoes.vue'),
		meta : {
			title : 'SHOES',
		}
	},
	{
		path : '/display/event',
		components : ()=> import('@/views/display/Event.vue'),
		meta : {
			title : 'EVENT',
		}
	},
	{
		path : '/display/promotion',
		components : ()=> import('@/views/display/Promotion.vue'),
		meta : {
			title : 'PROMOTION',
		}
	},
	{
		path : '/display/acc',
		components : ()=> import('@/views/display/Acc.vue'),
		meta : {
			title : 'ACC',
		}
	},
]