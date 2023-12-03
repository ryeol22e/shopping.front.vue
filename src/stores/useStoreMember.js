import { appApi } from '@/composables/useApi';
import useEnum from '@/composables/useEnum';
import { defineStore } from 'pinia';

const { MEMBER_CONST } = useEnum();

export const useStoreMember = defineStore('useStoreMember', {
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
			await appApi
				.get('/auth/check')
				.then((res) => (this.isLogin = res.data))
				.then((isLogin) => isLogin && !this.isInfoSet && this.setMemberInfo())
				.catch((error) => console.log(error));
		},
		async loginProcess(param) {
			await appApi
				.login('/member/login', param)
				.then((res) => (this.isLogin = res.data))
				.catch((error) => console.log(error));
		},
		async setMemberInfo() {
			await appApi
				.get('/member/info')
				.then((res) => (this.userInfo = res.data))
				.catch((error) => console.log(error));

			this.isInfoSet = true;
		},
		async logoutProcess() {
			await appApi.post('/member/logout').catch((error) => console.log(error));
		},
		async signUpProcess(param) {
			await appApi
				.post('/member/join', param)
				.then((res) => (this.signUpResult = res.data))
				.catch((error) => console.log(error));
		},
		async setAuthNumber(param) {
			await appApi
				.post('/member/auth/number', param)
				.then((res) => (this.authNumber = res.data))
				.catch((error) => console.log(error));
		},
	},
});
