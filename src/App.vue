<template>
	<metainfo />
	<q-layout>
		<q-page-container>
			<RouterView v-slot="{ Component, route }">
				<template v-if="Component">
					<Gnb>
						<q-page>
							<Suspense timeout="0">
								<template #default>
									<component :is="Component" :key="route.fullPath" />
								</template>
								<template #fallback>
									<Loading />
								</template>
							</Suspense>
						</q-page>
					</Gnb>
				</template>
			</RouterView>
		</q-page-container>
	</q-layout>
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
