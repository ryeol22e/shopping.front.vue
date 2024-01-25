import { useApi } from '@/composables/useApi';
import { useEnum } from '@/composables/useEnum';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStoreMember = defineStore('useStoreMember', () => {
	const { MEMBER_CONST } = useEnum();
	const { fetchGet, fetchPost } = useApi();

	const login = ref(false);
	const infoSet = ref(false);
	const signUpResult = ref(false);
	const authNumber = ref('');
	const userInfo = ref({
		memberId: '',
		memberName: '',
		memberRole: MEMBER_CONST.ANONYMOUS,
	});

	const isLogin = computed(() => login.value);
	const getUserInfo = computed(() => userInfo.value);
	const isSignUpresult = computed(() => signUpResult.value);
	const getAuthNumber = computed(() => authNumber.value);

	const authCheck = async () => {
		await fetchGet('/auth/check')
			.then((res) => (login.value = res.data))
			.then(async (loginBool) => {
				console.log(loginBool);
				if (loginBool && !infoSet.value) {
					await setMemberInfo();
				}
			})
			.catch((error) => console.log(error));
	};
	const loginProcess = async (param) => {
		await fetchPost('/member/login', param)
			.then((res) => {
				login.value = res;
			})
			.catch((error) => console.log(error));
	};
	const setMemberInfo = async () => {
		await fetchGet('/member/info')
			.then((res) => {
				userInfo.value = res.data;
				infoSet.value = true;
			})
			.catch((error) => console.log(error));
	};
	const logoutProcess = async () => {
		await fetchPost('/member/logout')
			.then(() => (location.href = '/'))
			.catch((error) => console.log(error));
	};
	const signUpProcess = async (param) => {
		await fetchPost('/member/join', param)
			.then((res) => (signUpResult.value = res.data))
			.catch((error) => console.log(error));
	};
	const setAuthNumber = async (param) => {
		await fetchPost('/member/auth/number', param)
			.then((res) => (authNumber.value = res.data))
			.catch((error) => console.log(error));
	};

	return {
		isLogin,
		isSignUpresult,
		getUserInfo,
		getAuthNumber,
		authCheck,
		loginProcess,
		setMemberInfo,
		logoutProcess,
		signUpProcess,
		setAuthNumber,
	};
});
