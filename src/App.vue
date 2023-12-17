<template>
	<metainfo />
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
	import useMetaInfo from '@/composables/useMetaInfo';
	import Gnb from '@/layouts/Gnb.vue';

	import { usePageLink } from '@/composables/usePageLink';
	import { onErrorCaptured, watchEffect } from 'vue';
	import { useMeta } from 'vue-meta';
	import { useStoreCommon } from './stores/useStoreCommon';

	const { errorPage } = usePageLink();
	const { getMetaInfo } = useMetaInfo();

	const storeCommon = useStoreCommon();
	storeCommon.setHeaders({
		codeType: '10000',
		codeDepth: '1',
		useYn: 'Y',
	});

	useMeta(getMetaInfo('init'));
	onErrorCaptured((error) => errorPage(500));
</script>
