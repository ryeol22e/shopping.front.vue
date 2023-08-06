import { ref } from 'vue';

export const useDeviceManager = () => {
	const isPc = ref(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

	return {
		isPc,
		isMobile,
	};
};
