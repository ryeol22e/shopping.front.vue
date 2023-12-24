import { useUtils } from './useUtils';

const { isEmpty, hasObjectProperty } = useUtils();

('use strict');
export const useHttp = () => {
	const cookie = () => {
		/**
		 * document.cookie object로 convert
		 * @returns
		 */
		const cookieObject = () => {
			const list = document.cookie.split('; ');
			const object = {};

			list.forEach((item) => {
				const objectRex = /{|}/gi;
				const key = item.substring(0, item.indexOf('='));
				const value = decodeURIComponent(item.substring(item.indexOf('=') + 1, item.length)) || null;

				if (!isEmpty(value) && objectRex.test(value)) {
					object[key] = JSON.parse(value);
				} else {
					object[key] = value;
				}
			});

			return object;
		};

		/**
		 * set cookie
		 * @param {*} key
		 * @param {*} value
		 * @param {*} expires
		 */
		const setCookie = (key, value, expires) => {
			if (isEmpty(key)) {
				throw 'parameter error.';
			}
			if (isEmpty(value)) {
				throw 'parameter error.';
			}
			if (!isEmpty(expires)) {
				if (expires.constructor !== Date) {
					throw 'date is not Date type.';
				}
			}

			document.cookie = key
				.concat('=')
				.concat(encodeURIComponent(JSON.stringify(value)))
				.concat(';path=/')
				.concat(';expires=')
				.concat(!isEmpty(expires) ? expires.toUTCString() : '');
		};

		/**
		 * cookie 전체 객체로 반환
		 * @returns
		 */
		const getCookieObject = () => {
			return cookieObject();
		};

		/**
		 * cookie 특정 값 반환
		 * @param {*} key
		 * @returns
		 */
		const getCookie = (key) => {
			const object = cookieObject();
			let value = null;

			if (hasObjectProperty(object, key)) {
				value = object[key];
			}

			return value || null;
		};

		/**
		 * cookie 삭제
		 * @param {*} key
		 */
		const deleteCookie = (key) => {
			const object = cookieObject();

			if (key.constructor !== String) {
				throw 'parameter is not String.';
			}

			document.cookie = key.concat('=; path=/; expires=').concat(new Date('1970/01/01').toString()).concat('; ');
		};

		return {
			setCookie,
			getCookie,
			deleteCookie,
		};
	};

	return {
		cookie,
	};
};
