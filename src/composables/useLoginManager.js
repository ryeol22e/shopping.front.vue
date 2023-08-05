import useStoreMember from '@/stores/useStoreMember';
import useEnum from './useEnum';

const { MEMBER_CONST } = useEnum();
export default () => {
	const useMember = useStoreMember();

	const isLogin = useMember.getIsLogin;
	const userInfo = useMember.getUserInfo;
	const userRole = useMember.getUserInfo.memberRole || MEMBER_CONST.ANONYMOUS;

	return {
		isLogin,
		userInfo,
		userRole,
	};
};
