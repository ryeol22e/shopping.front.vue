import { useStoreMember } from '@/stores/useStoreMember';
import { computed } from 'vue';
import useEnum from './useEnum';

const { MEMBER_CONST } = useEnum();
export default () => {
	const useMember = useStoreMember();

	const isLogin = computed(() => useMember.getIsLogin);
	const userInfo = computed(() => useMember.getUserInfo);
	const userRole = computed(() => useMember.getUserInfo.memberRole || MEMBER_CONST.ANONYMOUS);

	return {
		isLogin,
		userInfo,
		userRole,
	};
};
