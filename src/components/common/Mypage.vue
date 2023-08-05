<template>
	<div :class="`offcanvas offcanvas-start${isShow ? ' show' : ''}`" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="staticBackdropLabel">{{ `${memberName}님의 ` }} Mypage</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<ul>
				<li v-for="(item, index) in list" :key="index" data-bs-dismiss="offcanvas" aria-label="Close">
					<RouterLink :to="item.addInfo2" class="text-black" style="text-decoration: none">{{ item.codeName }}</RouterLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import useStoreCommon from '@/stores/useStoreCommon';
	import useStoreMember from '@/stores/useStoreMember';
	import { computed } from 'vue';
	import { RouterLink } from 'vue-router';

	const useCommon = useStoreCommon();
	const useMember = useStoreMember();
	const list = computed(() => useCommon.getMypageList);
	const memberName = computed(() => useMember.getUserInfo.memberName);
	const props = defineProps({
		isShow: {
			type: Boolean,
			default: false,
		},
	});
</script>

<style scope></style>
