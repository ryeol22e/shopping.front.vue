import { api } from '@/composables/useApi';
import useEnum from '@/composables/useEnum';
import useUtils from '@/composables/useUtils';
import { defineStore } from 'pinia';

const { MEMBER_CONST } = useEnum();
const { cookie } = useUtils();

export default defineStore('member', {
	state: () => ({
		isLogin: false,
		isInfoSet: false,
		userInfo: {
			memberNo: '',
			memberName: '',
			memberRole: MEMBER_CONST.ANONYMOUS,
		},
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
				.then((res) => (this.isLogin = res.data))
				.then((data) => (data ? this.setMemberInfo() : null))
				.catch((error) => console.log(error));
		},
		async loginProcess(param) {
			await api
				.post('/member/login', param)
				.then((res) => (this.isLogin = res.data))
				.catch((error) => console.log(error));
		},
		async setMemberInfo() {
			if (!this.isInfoSet) {
				await api
					.get('/member/info')
					.then((res) => (this.userInfo = res.data))
					.catch((error) => console.log(error));

				this.isInfoSet = true;
			}
		},
		async logoutProcess() {
			await api
				.post('/member/logout')
				.then((res) => {
					if (Boolean(res.data)) {
						cookie().deleteCookie('token');
					}
				})
				.catch((error) => console.log(error));
		},
		async signUpProcess(param) {
			await api
				.post('/member/join', param)
				.then((res) => (this.signUpResult = res.data))
				.catch((error) => console.log(error));
		},
		async setAuthNumber(param) {
			await api
				.post('/member/auth/number', param)
				.then((res) => (this.authNumber = res.data))
				.catch((error) => console.log(error));
		},
	},
});
