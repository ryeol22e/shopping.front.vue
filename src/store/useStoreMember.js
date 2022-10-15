import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('member', {
	state : ()=> ({
		isLogin : false,
		userInfo : '',
		signUpResult : false,
		authNumber : '',
	}),
	getters : {
		getIsLogin : state=> state.isLogin,
		getUserInfo : state=> state.userInfo,
		getSignUpResult : state=> state.signUpResult,
		getAuthNumber : state=> state.authNumber,
	},
	actions : {
		setLogin(bool) {
			this.isLogin = bool;
		},
		async authCheck() {
			this.isLogin = await axios.get('/auth/check')
				.then(res=> res.data)
				.catch(error=> console.log(error));
		},
		loginProcess(param) {
			this.userInfo = axios.get('/member/login', {
				params : param
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		signUpProcess(param) {
			this.signUpResult = axios.post('/member/join', param)
				.then(res=> res.data)
				.catch(error=> console.log(error));
		},
		setAuthNumber(param) {
			this.authNumber = axios.post('/member/auth/number', param)
				.then(res=> res.data)
				.catch(error=> console.log(error));
		}
	}
})