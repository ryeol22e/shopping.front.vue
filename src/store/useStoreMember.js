import { api } from '@/composables/useApi';
import { useUtils } from '@/composables/useUtils';
import { defineStore } from 'pinia';

const { isEmpty, useCookie } = useUtils();

export default defineStore('member', {
	state: () => ({
		isLogin: false,
		userInfo: JSON.parse(decodeURIComponent(sessionStorage.getItem('userInfo'))) || {},
		signUpResult: false,
		authNumber: '',
	}),
	getters: {
		getIsLogin: (state) => state.isLogin,
		getUserInfo: (state) => state.userInfo,
		getSignUpResult: (state) => state.signUpResult,
		getAuthNumber: (state) => state.authNumber,
	},
	actions: {
		async authCheck() {
			await api
				.get('/auth/check')
				.then((res) => {
					const bool = res.data;

					if (!bool) {
						sessionStorage.removeItem('userInfo');
					}

					this.isLogin = bool;
				})
				.catch((error) => console.log(error));
		},
		async loginProcess(param) {
			await api
				.post('/member/login', param)
				.then((res) => {
					if (!isEmpty(res.data)) {
						this.userInfo = res.data;
						sessionStorage.setItem('userInfo', encodeURIComponent(JSON.stringify(res.data)));
						this.isLogin = true;
					}
				})
				.catch((error) => console.log(error));
		},
		async logoutProcess() {
			await api
				.post('/member/logout')
				.then((res) => {
					if (Boolean(res.data)) {
						useCookie().deleteCookie('token');
						sessionStorage.removeItem('userInfo');
					}
				})
				.catch((error) => console.log(error));
		},
		signUpProcess(param) {
			api.post('/member/join', param)
				.then((res) => (this.signUpResult = res.data))
				.catch((error) => console.log(error));
		},
		setAuthNumber(param) {
			api.post('/member/auth/number', param)
				.then((res) => (this.authNumber = res.data))
				.catch((error) => console.log(error));
		},
	},
});
