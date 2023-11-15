import router from '@/router';

export const usePageLink = () => {
	const movePage = (data) => router.push(data);
	const backPage = () => router.go(-1);
	const reloadPage = () => router.go();
	const errorPage = (errorType = 404, reason = '') => movePage({ name: 'Error', state: { errorType, reason }, query: {}, params: {}, replace: true });

	return {
		movePage,
		backPage,
		reloadPage,
		errorPage,
	};
};
