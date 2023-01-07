import { defineStore } from "pinia";
import { memberEnum } from "../composables/useEnum";
import axios from "axios";

export default defineStore('member', {
	state : ()=> ({
		isLogin : false,
		userInfo : {},
		userRole : JSON.parse(sessionStorage.getItem('userInfo'))?.memberRole || memberEnum.ANONYMOUS,
		signUpResult : false,
		authNumber : '',
	}),
	getters : {
		getIsLogin : state=> state.isLogin,
		getUserInfo : state=> state.userInfo,
		getUserRole : state=> state.userRole,
		getSignUpResult : state=> state.signUpResult,
		getAuthNumber : state=> state.authNumber,
	},
	actions : {
		setLogin(bool) {
			this.isLogin = bool;
			this.userRole = JSON.parse(sessionStorage.getItem('userInfo'))?.memberRole || memberEnum.ANONYMOUS;
		},
		async authCheck() {
			await axios.get('/auth/check')
				.then(res=> this.isLogin = res.data)
				.catch(error=> console.log(error));
		},
		loginProcess(param) {
			axios.get('/member/login', {
				params : param
			})
			.then(res=> this.userInfo = res.data)
			.catch(error=> console.log(error));
		},
		signUpProcess(param) {
			axios.post('/member/join', param)
			.then(res=> this.signUpResult = res.data)
			.catch(error=> console.log(error));
		},
		setAuthNumber(param) {
			axios.post('/member/auth/number', param)
			.then(res=> this.authNumber = res.data)
			.catch(error=> console.log(error));
		}
	}
})