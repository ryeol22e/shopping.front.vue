export default [
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
			title : 'Error :('
		}
	},
]