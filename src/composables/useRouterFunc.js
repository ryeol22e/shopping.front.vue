import { useLoginManager } from '@/composables/useLoginManager';
import { useCommonFunc } from './useCommonFunc';
import { useUtils } from './useUtils';

import { useStoreMember } from '@/stores/useStoreMember';

const { AUTH_URL_LIST } = useCommonFunc();
const { findListSearch } = useUtils();

export const loginProcess = async (to) => {
	const storeMember = useStoreMember();
	const { isLogin } = useLoginManager();
	const path = String(to.path);
	const bool = await Promise.resolve()
		.then(async () => await storeMember.authCheck())
		.then(() => {
			let result = true;

			if (!path.includes('error')) {
				if (findListSearch(AUTH_URL_LIST, path)) {
					if (!isLogin.value) {
						result = false;
					}
				}
			}

			return result;
		})
		.catch((error) => console.log(error));

	return bool;
};
