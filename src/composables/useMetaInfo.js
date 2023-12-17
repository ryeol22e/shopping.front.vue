export default () => ({
	getMetaInfo(rotueName) {
		const name = String(rotueName).toLowerCase();
		const meta = {
			title: 'Welcome Shopping center!',
		};

		switch (name) {
			case 'top':
				meta.title = 'this is top!';
				break;
			default:
				break;
		}

		return meta;
	},
});
