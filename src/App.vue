<template>
	<RouterView v-slot="{ Component, route }">
		<template v-if="Component">
			<Gnb>
				<Suspense timeout="0">
					<template #default>
						<component :is="Component" :key="route.fullPath" />
					</template>
					<template #fallback>
						<Loading />
					</template>
				</Suspense>
			</Gnb>
		</template>
	</RouterView>
</template>

<script setup>
	import Loading from '@/components/common/Loading.vue';
	import Gnb from '@/layouts/Gnb.vue';

	import { usePageLink } from '@/composables/usePageLink';
	import { onErrorCaptured } from 'vue';

	import { useStoreCommon } from './stores/useStoreCommon';

	const { errorPage } = usePageLink();

	const storeCommon = useStoreCommon();
	storeCommon.setHeaders({
		codeType: '10000',
		codeDepth: '1',
		useYn: 'Y',
	});

	onErrorCaptured((error) => errorPage(500));
</script>
