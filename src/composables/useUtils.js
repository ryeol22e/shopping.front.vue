'use strict';

export const useUtils = ()=> {
	const useCookie = ()=> {
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
		const getCookie = key=> {
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
		const deleteCookie = key=> {
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
	const isEmpty = (data)=> {
		if(data!==undefined) {
			if(data!==null) {
				switch(data.constructor) {
					case String:
						if(data.replace(/\s/gi, '').length>0) {
							return false;
						}
						break;
					case Object:
						if(Object.keys(data).length>0) {
							return false;
						}
						break;
					case Array:
						if(data.length>0) {
							return false;
						}
						break;
				}
			}
		}
	
		return true;
	};
	const changeToFormData = (data)=> {
		const form = new FormData();
		const keyList = Object.keys(data);

		for(let i=0, length=keyList.length ; i<length ; i++) {
			const key = keyList[i];
			const value = data[key];

			form.append(key, value);
		}

		return form;
	};
	const scrollEvent = target=> {
		return window.addEventListener('scroll', (e)=> {

		});
	}

	return {
		useCookie,
		isEmpty,
		changeToFormData,
		scrollEvent,
	};
};

