import { useStoreMember } from '@/stores/useStoreMember';
import useCommonFunc from './useCommonFunc';
import useUtils from './useUtils';

const { AUTH_URL_LIST } = useCommonFunc();
const { findListSearch } = useUtils();

export const useLoginProcess = async (to) => {
	const path = String(to.path);
	const useMember = useStoreMember();
	let bool = true;

	if (!path.includes('error')) {
		await useMember.authCheck();
		if (findListSearch(AUTH_URL_LIST, path)) {
			if (!useMember.getIsLogin) {
				bool = false;
			}
		}
	}

	return bool;
};
