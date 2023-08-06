'use strict';

export default () => {
	/**
	 * 데이터 empty 검사
	 * @param {*} data
	 */
	const isEmpty = (data) => {
		let bool = true;

		if (data !== undefined && data !== null) {
			switch (data.constructor) {
				case String:
					if (data.replace(/\s/gi, '').length > 0) {
						bool = false;
					}
					break;
				case Object:
					if (Object.keys(data).length > 0) {
						bool = false;
					}
					break;
				case Array:
					if (data.length > 0) {
						bool = false;
					}
					break;
				case Date || Number || Boolean:
					bool = false;
					break;
			}
		}

		return bool;
	};
	/**
	 * 객체 프로퍼티 존재유무 검사
	 * @param {*} object
	 * @param {*} property
	 */
	const hasObjectProperty = (object, property) => (isEmpty(object) ? false : Object.hasOwnProperty.call(object, property));

	/**
	 * model data formData로 변경
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

	const numberComma = (data) => Number(data).toLocaleString(navigator.language);

	/**
	 * 스크롤이벤트
	 * @param {*} target
	 */
	const scrollEvent = (target) => {
		return window.addEventListener('scroll', (e) => {});
	};

	return {
		isEmpty,
		hasObjectProperty,
		changeToFormData,
		numberComma,
		scrollEvent,
	};
};
