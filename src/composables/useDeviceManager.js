import { computed } from 'vue';

export const useDeviceManager = () => {
	const isPc = computed(() => !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	const isMobile = computed(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

	return {
		isPc,
		isMobile,
	};
};
