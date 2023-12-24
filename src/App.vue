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
	import Gnb from '@/layouts/Gnb.vue';

	import { usePageLink } from '@/composables/usePageLink';
	import { computed, onErrorCaptured } from 'vue';
	import { useMeta } from 'vue-meta';
	import { useRoute } from 'vue-router';
	import { useMetaTag } from './composables/useMetaTag';
	import { useStoreCommon } from './stores/useStoreCommon';

	const route = useRoute();
	const { errorPage } = usePageLink();
	const { getMetaInfo } = useMetaTag();

	const storeCommon = useStoreCommon();
	storeCommon.setHeaders({
		codeType: '10000',
		codeDepth: '1',
		useYn: 'Y',
	});

	useMeta(computed(() => getMetaInfo(route)));

	onErrorCaptured((error) => errorPage(500));
</script>
