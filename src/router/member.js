export default [
	{
		path : '/login',
		name : 'Login',
		component : ()=> import('@/views/member/Login.vue'),
		meta : {
			title : 'login',
		}
	},
	{
		path : '/signup',
		name : 'SignUp',
		component : ()=> import('@/views/member/SignUp.vue'),
		meta : {
			title : 'join'
		}
	},
	
]