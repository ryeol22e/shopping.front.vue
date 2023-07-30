import useStoreMember from '@/store/useStoreMember';

const authUrl = ['/display/vip'];
export const useLoginProcess = async (to) => {
	const path = String(to.path);
	const useMember = useStoreMember();
	let bool = true;

	await useMember.authCheck();

	if (authUrl.includes(path)) {
		if (!useMember.getIsLogin) {
			bool = false;
		}
	}

	return bool;
};
