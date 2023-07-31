import { api } from '@/composables/useApi';
import { MEMBER_CONST } from '@/composables/useEnum';
import { useUtils } from '@/composables/useUtils';
import { defineStore } from 'pinia';

const { isEmpty } = useUtils();
export default defineStore('member', {
	state: () => ({
		isLogin: false,
		userInfo: {},
		userRole: MEMBER_CONST.ANONYMOUS,
		signUpResult: false,
		authNumber: '',
	}),
	getters: {
		getIsLogin: (state) => state.isLogin,
		getUserInfo: (state) => state.userInfo,
		getUserRole: (state) => state.userRole,
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
						this.userRole = MEMBER_CONST.ANONYMOUS;
					} else {
						this.userRole = JSON.parse(decodeURIComponent(sessionStorage.getItem('userInfo'))).memberRole;
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
						this.isLogin = true;
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
