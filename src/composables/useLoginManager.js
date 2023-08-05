import useStoreMember from '@/stores/useStoreMember';
import { MEMBER_CONST } from './useEnum';

const loginManager = () => {
	const useMember = useStoreMember();

	const isLogin = useMember.getIsLogin;
	const userInfo = useMember.getUserInfo;
	const userRole = useMember.getUserInfo.memberRole;

	return {
		isLogin,
		userInfo,
		userRole,
	};
};

export const userIsLogin = loginManager().isLogin;
export const userInfo = loginManager().userInfo || {};
export const userRole = loginManager().userRole || MEMBER_CONST.ANONYMOUS;
