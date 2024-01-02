import { useUtils } from './useUtils';

{
	/* <meta property="og:type" content="website">
		<meta property="og:url" content="">
		<meta property="og:title" content="">
		<meta property="og:image" content="">
		<meta property="og:description" content="">
		<meta property="og:site_name" content="">
		<meta property="og:locale" content="">
		<meta name="twitter:card" content="" /> 
		<meta name="twitter:title" content="" /> 
		<meta name="twitter:description" content="" /> 
		<meta name="twitter:image" content="" /> 		
		<meta property="al:ios:url" content="" />
		<meta property="al:ios:app_store_id" content="" /> 
		<meta property="al:ios:app_name" content="" /> 
		<meta property="al:android:url" content="" />
		<meta property="al:android:app_name" content="" />
		<meta property="al:android:package" content="" /> 
		<meta property="al:web:url" content="" /> */
}
export const useMetaTag = () => ({
	getMetaInfo(to = {}) {
		const { isEmpty, hasObjectProperty } = useUtils();

		const name = String(to.name).toLowerCase();
		const url = `${location.origin}${to.fullPath}`;
		let title = 'welcome shopping center!';
		let description = 'here is shopping mall';
		let metaImage = '';

		if (!isEmpty(to) && name !== 'error') {
			if (hasObjectProperty(to, 'meta') && !isEmpty(to.meta)) {
				title = to.meta?.title;
				description = title;
			} else {
				switch (name) {
					case 'acc':
						title = 'Accessory';
						description = name;
						break;
					case 'event':
						title = 'event';
						description = name;
						break;
					case 'outer':
						title = 'outer';
						description = name;
						break;
					case 'patns':
						title = 'pants';
						description = name;
						break;
					case 'promotion':
						title = 'promotion';
						description = name;
						break;
					case 'shoes':
						title = 'shoes';
						description = name;
						break;
					case 'top':
						title = 'top';
						description = name;
						break;
					case 'vip':
						title = 'vip room';
						description = 'here is only you.';
						break;
					default:
						break;
				}
			}
		}

		const info = {
			title,
			description,
			meta: [
				{ vmid: 'og:url', name: 'og:url', content: url },
				{ vmid: 'og:type', name: 'og:type', content: 'website' },
				{ vmid: 'og:title', name: 'og:title', content: title },
				{ vmid: 'og:description', name: 'og:description', content: description },
				{ vmid: 'og:image', name: 'og:image', content: metaImage },

				{ vmid: 'twitter:card', name: 'twitter:card', content: 'summary' },
				{ vmid: 'twitter:url', name: 'twitter:url', content: url },
				{ vmid: 'twitter:title', name: 'twitter:title', content: title },
				{ vmid: 'twitter:description', name: 'twitter:description', content: description },
				{ vmid: 'twitter:image', name: 'twitter:image', content: metaImage },
			],
		};

		return info;
	},
});
