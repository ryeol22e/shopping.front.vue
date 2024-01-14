import { useUtils } from './useUtils';

('use strict');
export const useStorage = () => {
	const { isEmpty } = useUtils();

	/**
	 * custom sessionStorage
	 */
	const appSession = () => {
		const setItem = (key, value) => sessionStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
		const removeItem = (key) => sessionStorage.removeItem(key);
		const getItem = (key) => {
			let value = null;

			if (!isEmpty(value)) {
				try {
					value = JSON.parse(decodeURIComponent(sessionStorage.getItem(key)));
				} catch (error) {
					value = decodeURIComponent(sessionStorage.getItem(key));
				}
			}

			return value;
		};

		return {
			setItem,
			getItem,
			removeItem,
		};
	};

	/**
	 * custom localStorage
	 */
	const appLocalStorage = () => {
		const setItem = (key, value) => localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
		const removeItem = (key) => localStorage.removeItem(key);
		const getItem = (key) => {
			let value = null;

			if (!isEmpty(value)) {
				try {
					value = JSON.parse(decodeURIComponent(sessionStorage.getItem(key)));
				} catch (error) {
					value = decodeURIComponent(sessionStorage.getItem(key));
				}
			}
		};

		return {
			setItem,
			getItem,
			removeItem,
		};
	};

	return {
		appSession,
		appLocalStorage,
	};
};
