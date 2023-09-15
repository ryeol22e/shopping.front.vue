<template>
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li class="page-item">
				<a class="page-link" href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li class="page-item"><a class="page-link" href="javascript:void(0);" @click="goPage(1)">1</a></li>
			<li class="page-item"><a class="page-link" href="javascript:void(0);" @click="goPage(2)">2</a></li>
			<li class="page-item"><a class="page-link" href="javascript:void(0);" @click="goPage(3)">3</a></li>
			<li class="page-item">
				<a class="page-link" href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { usePageLink } from '@/composables/usePageLink';

	const { movePage } = usePageLink();

	const route = useRoute();
	const setPagination = (data) => {
		if (data.constructor === Number) {
		} else {
		}
	};
	const goPage = (page) => {
		setPagination(page);
		movePage({ path: route.fullPath, query: { ...route.query, page } });
	};

	onMounted(() => {
		console.log(history.state);
	});
</script>
