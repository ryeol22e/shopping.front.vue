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

const getMetaInfo = (to) => {
	const name = to.name;

	switch (name) {
	}
};

export const setMeta = (to) => {
	const title = 'Welcome Shopping center!';
	const metaList = [
		{ name: 'Keywords', content: 'shopping, 쇼핑' },
		{ name: 'Description', content: 'shopping, center' },
		{ name: 'twitter:card', content: '' },
		{ name: 'twitter:title', content: `${hasObjectProperty(to, 'meta') ? to.meta.title : title}` },
		{ name: 'twitter:description', content: 'here is shopping mall' },
		{ name: 'twitter:image', content: '' },

		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: `${location.origin}${to.fullPath}` },
		{ property: 'og:title', content: `${hasObjectProperty(to, 'meta') ? to.meta.title : title}` },
		{ property: 'og:image', content: '' },
		{ property: 'og:description', content: 'here is shopping mall' },
		{ property: 'og:site_name', content: 'shoppingMall' },
		{ property: 'og:locale', content: 'ko_KR' },

		{ property: 'al:ios:url', content: 'ios mobile url' },
		{ property: 'al:ios:app_store_id', content: 'ios app store id' },
		{ property: 'al:ios:app_name', content: 'ios app name' },

		{ property: 'al:android:url', content: 'android app url' },
		{ property: 'al:android:app_name', content: 'android app name' },
		{ property: 'al:android:package', content: 'android package name' },
		{ property: 'al:web:url', content: 'android app url' },
	];

	for (let i = 0, size = metaList.length; i < size; i++) {
		const meta = metaList[i];

		if (hasObjectProperty(meta, 'name')) {
			document.querySelector(`meta[name="${meta.name}"]`).setAttribute('content', meta.content);
		} else {
			if (!meta.property.includes('ios') && !meta.property.includes('android') && meta.property !== 'al:web:url') {
				document.querySelector(`meta[property="${meta.property}"]`).setAttribute('content', meta.content);
			}
		}
	}

	document.title = title;
};
