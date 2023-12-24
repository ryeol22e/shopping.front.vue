import useUtils from './useUtils';

('use strict');
export default () => {
	const { isEmpty } = useUtils();

	/**
	 * 쿠키함수
	 */
	const appCookie = () => {
		/**
		 * document.cookie 객체로 convert
		 * @returns
		 */
		const getCookieObject = () => {
			const list = document.cookie.split('; ');
			const object = {};

			list.forEach((item) => {
				const key = item.substring(0, item.indexOf('='));
				const value = decodeURIComponent(item.substring(item.indexOf('=') + 1, item.length)).replace(/\s|\t|\n/gi, '');

				object[key] = !isEmpty(value) ? JSON.parse(value) : null;
			});

			return object;
		};

		/**
		 * cookie set
		 * @param {*} key
		 * @param {*} value
		 * @param {*} option
		 */
		const setCookie = (key, value, option) => {
			let optionStr = '';

			if (isEmpty(key)) {
				throw 'setCookie key error.';
			}
			if (isEmpty(value)) {
				deleteCookie(key);
			}

			if (!isEmpty(option)) {
				Object.keys(option).forEach((key) => {
					if (key === 'expires') {
						if (!isEmpty(option[key]) && option[key].constructor !== Date) {
							throw 'expires is not Date type.';
						}
					}

					optionStr += `;${key}=${option[key]}`;
				});
			}

			document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))};path=/${optionStr}`;
		};

		/**
		 * key로 cookie 값 반환
		 * @param {*} key
		 * @returns
		 */
		const getCookie = (key) => {
			const object = getCookieObject();
			let value = null;

			if (Object.hasOwnProperty.call(object, key)) {
				value = object[key];
			}

			return value;
		};

		/**
		 * cookie 삭제
		 * @param {*} key
		 */
		const deleteCookie = (key) => {
			if (key.constructor !== String) {
				throw 'parameter is not String.';
			}

			document.cookie = `${key}=;expires=${new Date('1970/01/01').toUTCString()}; path=/;`;
			console.log(document.cookie);
		};

		return {
			setCookie,
			getCookie,
			deleteCookie,
		};
	};

	/**
	 * custom sessionStorage
	 */
	const appSession = () => {
		const setItem = (key, value) => sessionStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
		const removeItem = (key) => sessionStorage.removeItem(key);
		const getItem = (key) => {
			const value = JSON.parse(decodeURIComponent(sessionStorage.getItem(key)));

			return !isEmpty(value) ? value : null;
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
			const value = JSON.parse(decodeURIComponent(sessionStorage.getItem(key)));

			return !isEmpty(value) ? value : null;
		};

		return {
			setItem,
			getItem,
			removeItem,
		};
	};

	return {
		appCookie,
		appSession,
		appLocalStorage,
	};
};
