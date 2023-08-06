import router from '@/router';

export const usePageLink = () => {
	const movePage = (data) => router.push(data);
	const backPage = () => router.go(-1);
	const reloadPage = () => router.go();
	const errorPage = (errorType) => movePage({ name: 'Error', state: { errorType }, query: {}, params: {} });

	return {
		movePage,
		backPage,
		reloadPage,
		errorPage,
	};
};
