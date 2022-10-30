<template>
	<div :class="`offcanvas offcanvas-start${isShow ? ' show' : ''}`" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="staticBackdropLabel">Mypage</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
				<ul>
					<li v-for="(item, index) in list" :key="index" @click="goMypage(item.addInfo2)" data-bs-dismiss="offcanvas" aria-label="Close">
						<a href="#" class="text-black" style="text-decoration: none;">{{item.codeName}}</a>
					</li>
				</ul>
		</div>
	</div>
</template>

<script setup>
	import {useRouter} from 'vue-router';

	const router = useRouter();
	const props = defineProps({
		list : {
			type : Array,
			default : [],
		},
		isShow : {
			type : Boolean,
			default : false,
		}
	});

	const goMypage = (url)=> {
		router.push(url);
	};
</script>

<style scope>
	
</style>