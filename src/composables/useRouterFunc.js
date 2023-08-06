import { useStoreMember } from '@/stores/useStoreMember';

const authUrl = ['/display/vip'];
export const useLoginProcess = async (to) => {
	const path = String(to.path);
	const useMember = useStoreMember();
	let bool = true;

	if (!path.includes('error')) {
		await useMember.authCheck();
		if (authUrl.includes(path)) {
			if (!useMember.getIsLogin) {
				bool = false;
			}
		}
	}

	return bool;
};
