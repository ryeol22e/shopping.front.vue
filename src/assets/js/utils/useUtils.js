'use strict';

export const useUtilCookie = ()=> {
	/**
	 * document.cookie object로 convert
	 * @returns 
	 */
	 const cookieObject = ()=> {
		const list = document.cookie.split('; ');
		const object = new Object();

		list.forEach(item=> {
			const key = item.substring(0, item.indexOf('='));
			const value = item.substring(item.indexOf('=')+1, item.length);

			object[key] = value;
		});

		return object;
	};

	/**
	 * cookie 추가
	 * @param {} key 
	 * @param {*} value 
	 */
	const setCookie = (key, value)=> {
		if(key===undefined || key===null || key==='') {
			throw 'parameter error.';
		} else if(value===undefined || value===null || value==='') {
			throw 'parameter error.';
		}
		
		document.cookie = key.concat('=').concat(value);
	};

	/**
	 * cookie 전체 객체로 반환
	 * @returns 
	 */
	const getCookieObject = ()=> {
		return cookieObject();
	}

	/**
	 * cookie 특정 값 반환
	 * @param {*} key 
	 * @returns 
	 */
	const getCookie = (key)=> {
		const object = cookieObject();
		let value = null;

		if(object.hasOwnProperty(key)) {
			value = object[key];
		}

		return value || '';
	};

	/**
	 * cookie 삭제
	 * @param {*} key 
	 */
	const deleteCookie = (key)=> {
		const object = cookieObject();

		if(key.constructor!==String) {
			throw 'parameter is not String.';
		}

		document.cookie = key.concat('=; expires=').concat(new Date('1970/01/01').toString()).concat('; ');
	};

	return {
		setCookie,
		getCookie,
		deleteCookie,
	};
};