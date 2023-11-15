import { useUtils } from './useUtils';

const { isEmpty } = useUtils();

('use strict');
export default () => {
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
				const value = decodeURIComponent(item.substring(item.indexOf('=') + 1, item.length));

				if (/{|}|\[|\]/gi.test(value)) {
					object[key] = JSON.parse(value);
				} else {
					object[key] = value;
				}
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

					optionStr += ';'.concat(key).concat('=').concat(option[key]).concat(';');
				});
			}

			document.cookie = String(key)
				.concat('=')
				.concat(encodeURIComponent(JSON.stringify(value)))
				.concat(';')
				.concat('path=/')
				.concat(optionStr);
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

			const fixedDomainKey = ['FILTER_OPTION'];
			let cookieStr = key.concat('=;expires=').concat(new Date('1970/01/01').toUTCString()).concat(';');

			if (fixedDomainKey.includes(key)) {
				cookieStr += 'domain=.a-rt.com; path=/;';
			}

			document.cookie = cookieStr;
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
		const getItem = (key) => JSON.parse(decodeURIComponent(sessionStorage.getItem(key)));
		const removeItem = (key) => sessionStorage.removeItem(key);

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
		const getItem = (key) => {
			const value = decodeURIComponent(localStorage.getItem(key));
			let resultValue = '';

			if (/{|}|\[|\]/gi.test(value)) {
				resultValue = JSON.parse(value);
			} else {
				resultValue = value;
			}

			return resultValue || null;
		};
		const removeItem = (key) => localStorage.removeItem(key);

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
