import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('member', {
	state : ()=> ({
		isLogin : false,
		signUpResult : false,
	}),
	getters : {
		isLogin : state=> state.isLogin,
		getSignUpResult : state=> state.signUpResult,
	},
	actions : {
		async loginProcess(param) {
			this.isLogin = await axios.get('/member/login', {
				params : param
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async signUpProcess(param) {
			this.signUpResult = await axios.post('/member/join', param)
				.then(res=> res.data)
				.catch(error=> console.log(error));
		},
		async setAuthNumber(param) {
			await axios.post('/member/auth/number', param)
				.then(res=> {
					const authNumber = res.data;

					sessionStorage.setItem('authNumber', authNumber);
					alert(`인증번호는 "${authNumber}" 입니다.`);
				})
				.catch(error=> console.log(error));
		}
	}
})