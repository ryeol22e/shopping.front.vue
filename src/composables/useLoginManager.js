import useStoreMember from '@/store/useStoreMember';
import { MEMBER_CONST } from './useEnum';

export const loginManager = () => {
	const isLogin = useStoreMember().getIsLogin;
	const userInfo = useStoreMember().getUserInfo;
	const userRole = userInfo.memberRole;

	return {
		isLogin,
		userInfo,
		userRole,
	};
};

export const isLogin = loginManager().isLogin;
export const userInfo = loginManager().userInfo || {};
export const userRole = loginManager().userRole || MEMBER_CONST.ANONYMOUS;
