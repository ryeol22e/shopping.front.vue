import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('member', {
	state : ()=> ({
		isLogin : false,
		token : '',
		signUpResult : false,
		authNumber : '',
	}),
	getters : {
		isLogin : state=> state.isLogin,
		getToken : state=> state.token,
		getSignUpResult : state=> state.signUpResult,
		getAuthNumber : state=> state.authNumber,
	},
	actions : {
		loginProcess(param) {
			this.token = axios.get('/member/login', {
				params : param
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		setIsLogin(bool) {
			this.isLogin = bool;
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