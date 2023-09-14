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

	const route = useRoute();
	const goPage = (page) => {
		const obj = history.state;
		const now = obj.current;

		obj.back = now;
		obj.current = now.replace(`page=${route.query.page}`, `page=${page}`);
		history.pushState(obj, `page=${page}`, `?page=${page}`);
	};

	onMounted(() => {
		console.log(history.state);
	});
</script>
