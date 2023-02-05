import { defineStore } from "pinia";
import { MEMBER_CONST } from "@/composables/useEnum.js";
import {api} from "@/composables/useAxios.js"
import {useUtils} from '@/composables/useUtils.js';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default defineStore('member', {
	state : ()=> ({
		isLogin : !useUtils().isEmpty(userInfo) ? true : false,
		userInfo : {},
		userRole : userInfo?.memberRole || MEMBER_CONST.ANONYMOUS,
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
			this.userRole = userInfo?.memberRole || MEMBER_CONST.ANONYMOUS;
		},
		async authCheck() {
			await api.get('/auth/check')
				.then(res=> {this.isLogin = res.data})
				.catch(error=> console.log(error));
		},
		loginProcess(param) {
			api.get('/member/login', {
				params : param
			})
			.then(res=> this.userInfo = res.data)
			.catch(error=> console.log(error));
		},
		signUpProcess(param) {
			api.post('/member/join', param)
			.then(res=> this.signUpResult = res.data)
			.catch(error=> console.log(error));
		},
		setAuthNumber(param) {
			api.post('/member/auth/number', param)
			.then(res=> this.authNumber = res.data)
			.catch(error=> console.log(error));
		}
	}
})