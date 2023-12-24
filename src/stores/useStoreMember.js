import useApi from '@/composables/useApi';
import useEnum from '@/composables/useEnum';
import useStorage from '@/composables/useStorage';
import { defineStore } from 'pinia';

export const useStoreMember = () => {
	const { appCookie } = useStorage();
	const { setCookie, deleteCookie } = appCookie();
	const { MEMBER_CONST } = useEnum();
	const { appApi } = useApi();

	return defineStore('useStoreMember', {
		state: () => ({
			isLogin: false,
			isInfoSet: false,
			userInfo: {
				memberId: '',
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
					.then(async (isLogin) => {
						if (isLogin && !this.isInfoSet) {
							await this.setMemberInfo();
						}
					})
					.catch((error) => console.log(error));
			},
			async loginProcess(param) {
				await appApi
					.post('/member/login', param)
					.then((res) => {
						const data = res.data;
						this.isLogin = data.isLogin;
						setCookie('AUCCESS_TOKEN', data.token);
					})
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
				deleteCookie('token');
				location.href = '/';
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
	})();
};
