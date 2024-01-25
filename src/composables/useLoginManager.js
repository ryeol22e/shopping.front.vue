import { useStoreMember } from '@/stores/useStoreMember';
import { computed } from 'vue';
import { useEnum } from './useEnum';

const { MEMBER_CONST } = useEnum();

export const useLoginManager = () => {
	const storeMember = useStoreMember();

	const isLogin = computed(() => storeMember.isLogin);
	const userInfo = computed(() => storeMember.getUserInfo);
	const userRole = computed(() => storeMember.getUserInfo.memberRole || MEMBER_CONST.ANONYMOUS);

	return {
		isLogin,
		userInfo,
		userRole,
	};
};
