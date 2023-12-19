import useLoginManager from '@/composables/useLoginManager';
import useCommonFunc from './useCommonFunc';
import useUtils from './useUtils';

import { useStoreMember } from '@/stores/useStoreMember';

const { AUTH_URL_LIST } = useCommonFunc();
const { findListSearch, hasObjectProperty, isEmpty } = useUtils();

export const loginProcess = async (to) => {
	const storeMember = useStoreMember();
	const { isLogin } = useLoginManager();
	const path = String(to.path);
	let bool = true;

	Promise.resolve()
		.then(async () => await storeMember.authCheck())
		.then(() => {
			if (!path.includes('error')) {
				if (findListSearch(AUTH_URL_LIST, path)) {
					if (!isLogin.value) {
						bool = false;
					}
				}
			}
		})
		.catch((error) => console.log(error));

	return bool;
};
