import { useStoreMember } from '@/stores/useStoreMember';
import useCommonFunc from './useCommonFunc';

const { AUTH_URL_LIST } = useCommonFunc();

export const useLoginProcess = async (to) => {
	const path = String(to.path);
	const useMember = useStoreMember();
	let bool = true;

	if (!path.includes('error')) {
		await useMember.authCheck();
		if (AUTH_URL_LIST.includes(path)) {
			if (!useMember.getIsLogin) {
				bool = false;
			}
		}
	}

	return bool;
};
