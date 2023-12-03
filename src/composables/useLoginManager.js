import useEnum from './useEnum';

import { useStoreMember } from '@/stores/useStoreMember';
import { computed } from 'vue';

const { MEMBER_CONST } = useEnum();

export default () => {
	const storeMember = useStoreMember();

	const isLogin = computed(() => storeMember.getIsLogin);
	const userInfo = computed(() => storeMember.getUserInfo);
	const userRole = computed(() => storeMember.getUserInfo.memberRole || MEMBER_CONST.ANONYMOUS);

	return {
		isLogin,
		userInfo,
		userRole,
	};
};
