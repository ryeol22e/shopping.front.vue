'use strict';
export default () => {
	/**
	 * 숫자 자릿수찍기
	 * useNumberComma(data)
	 * @param {*} data
	 */
	const numberComma = (data) => (!isNaN(data) && !isEmpty(data) ? Number(data).toLocaleString(navigator.language) : 0);

	/**
	 * 10미만 숫자 앞에 0붙이기
	 * useNumberAddZero(data)
	 * @param {*} data
	 */
	const numberAddZero = (data) => (Number(data) < 10 ? `0${data}` : data);

	/**
	 * 데이터 unescape처리
	 * unescapeString(data)
	 * @param {*} data
	 */
	const unescapeString = (data) => (!isEmpty(data) ? new DOMParser().parseFromString(data, 'text/html').documentElement.textContent : '');

	/**
	 * no image 처리
	 * noImage($event)
	 * @param {*} e
	 */
	const noImage = (e) => (e.target.src = '/images/common/no_image.png');

	/**
	 * 화면 위치지정
	 * useWindowPosition(object)
	 * @param {*} data
	 */
	const windowPosition = (data) => {
		if (data.constructor !== Object) {
			throw 'parameter is not object';
		}

		window.scrollTo({ ...data, behavior: 'smooth' });
	};

	/**
	 * 데이터 empty 여부
	 * isEmpty(data)
	 * @param {*} data
	 * @Return true : 비었다, false : 데이터가 있다.
	 */
	const isEmpty = (data) => {
		let bool = true;

		if (data !== undefined && data !== null) {
			switch (data.constructor) {
				case String:
					const str = data.replace(/[\s|\t]/gi, '');
					if (str !== 'null' && str.length > 0) {
						bool = false;
					}
					break;
				case Array:
					if (data.length > 0) {
						bool = false;
					}
					break;
				case Object:
					if (Object.keys(data).length > 0) {
						bool = false;
					}
					break;
				case Date:
					bool = false;
					break;
				case Number:
					bool = false;
					break;
				case Boolean:
					bool = false;
					break;
			}
		}

		return bool;
	};

	/**
	 * 객체 특정 프로퍼티 존재유무 판단
	 * @param {*} object
	 * @param {*} target
	 * @returns true : 존재, false : 없음
	 */
	const hasObjectProperty = (object, target) => (!isEmpty(object) ? Object.hasOwnProperty.call(object, target) : false);

	/**
	 * html 문자열 랜더링(v-html을 사용할수 없을때 ex> script가 포함되어있을때)
	 * ※ onMounted에서 쓸수있다.
	 * @param {*} target document.getElementById or id string
	 * @param {*} data string
	 * @param {*} isUnescape
	 */
	const renderHTML = (target, data, isUnescape = true) => {
		const htmlString = isUnescape ? unescapeString(data) : data;
		const parser = new DOMParser().parseFromString(htmlString, 'text/html').documentElement;
		const elArr = [...parser.children];
		const length = elArr.length;

		if (target.constructor === String) {
			target = document.getElementById(target);
		}

		parent: for (let i = 0; i < length; i++) {
			const el = elArr[i];

			if (el.children.length > 0) {
				if (!findListSearch(['head', 'body'], el.localName)) {
					continue;
				}

				const childArr = [...el.children];
				const childLength = childArr.length;

				children: for (let j = 0; j < childLength; j++) {
					const elChild = childArr[j];

					if ([...elChild.children].map((child) => child.localName).includes('script')) {
						target.insertAdjacentElement('afterbegin', elChild);
						renderHTML(elChild, elChild.innerHTML, false);
					} else {
						if (elChild.localName !== 'script') {
							target.insertAdjacentElement('afterbegin', elChild);
						} else {
							const script = document.createElement('script');

							script.textContent = elChild.textContent;
							target.insertAdjacentElement('afterbegin', script);
						}
					}
				}
			}
		}
	};

	/**
	 * 원시값(int, string, float...) 리스트 요소 찾기
	 * @param {*} list
	 * @param {*} findData
	 */
	const findListSearch = (list, findData) => {
		const SORT_LIST = list.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
		let isExists = false;
		let left = 0;
		let right = SORT_LIST.length - 1;

		for (let i = 0, size = SORT_LIST.length; i < size; i++) {
			let mid = Math.floor((left + right) / 2);

			if (SORT_LIST[mid] === findData) {
				isExists = true;
				break;
			} else if (SORT_LIST[mid] < findData) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return isExists;
	};

	/**
	 * object change form data
	 * @param {*} data
	 */
	const changeToFormData = (data) => {
		const form = new FormData();
		const keyList = Object.keys(data);

		for (let i = 0, length = keyList.length; i < length; i++) {
			const key = keyList[i];
			const value = data[key];

			form.append(key, value);
		}

		return form;
	};

	return {
		isEmpty,
		hasObjectProperty,
		changeToFormData,
		numberComma,
		findListSearch,
		renderHTML,
		windowPosition,
		numberAddZero,
	};
};
