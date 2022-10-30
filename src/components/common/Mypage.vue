<template>
	<div :class="`offcanvas offcanvas-start${isShow ? ' show' : ''}`" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="staticBackdropLabel">Mypage</h5>
			<button @click="isShow=!isShow" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<router-link v-for="(item, index) in list" :key="index" :to="item.addInfo2">
				<div class="text-black">
					{{item.codeName}}
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		list : {
			type : Array,
			default : [],
		},
		isShow : {
			type : Boolean,
			default : false,
		}
	});
</script>

<style scope>
	a {
		text-decoration-line: none;
	}
</style>