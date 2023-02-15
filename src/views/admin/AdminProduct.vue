<template>
	<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
		<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h1 class="h2">상품등록</h1>
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">상품번호</span>
			<input v-model="data.prdtNo" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" maxlength="10" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">카테고리</span>
			<select v-model="data.cateNo" class="form-select" aria-label="Default select example">
				<option value="" selected>선택</option>
				<option v-for="(item, index) in cateList" :key="index" :value="item.cateNo">{{ item.cateName }}</option>
			</select>
			<span class="input-group-text">사용여부</span>
			<select v-model="data.useYn" class="form-select" aria-label="Default select example">
				<option value="N" selected>미사용</option>
				<option value="Y">사용</option>
			</select>
			<span class="input-group-text">전시여부</span>
			<select v-model="data.dispYn" class="form-select" aria-label="Default select example">
				<option value="N" selected>미전시</option>
				<option value="Y">전시</option>
			</select>
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">상품명</span>
			<input v-model="data.prdtName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">이미지</span>
			<input @change="imageUpload" class="form-control" type="file" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">정상가</span>
			<input v-model="data.normalPrice" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">판매가</span>
			<input v-model="data.sellPrice" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
		</div>

		<button type="button" class="btn btn-primary" @click="registProduct">등록</button>
	</main>
</template>

<script setup>
	import { reactive, computed, onMounted, watchEffect } from 'vue';
	import { useRouter } from 'vue-router';
	import { useUtils } from '@/composables/useUtils.js';
	import { useStoreProduct } from '@/store/useStoreProduct.js';

	const router = useRouter();
	const utils = useUtils();
	const useProduct = useStoreProduct();
	const cateList = computed(() => useProduct.getCateList);
	const data = reactive({
		prdtNo: '',
		prdtName: '',
		cateNo: '',
		normalPrice: '',
		sellPrice: '',
		useYn: 'N',
		dispYn: 'N',
		file: null,
	});
	const imageUpload = e => {
		data.file = e.target.files[0];
	};
	const dataValidate = () => {
		if (data.prdtNo === '') {
			alert('상품번호를 입력하세요.');
			return false;
		}
		if (data.prdtName === '') {
			alert('상품명을 입력하세요.');
			return false;
		}
		if (data.cateNo === '선택') {
			alert('카테고리를 선택해주세요.');
			return false;
		}
		if (data.normalPrice === '') {
			alert('정상가를 입력하세요.');
			return false;
		}
		if (data.sellPrice === '') {
			alert('판매가를 입력하세요.');
			return false;
		}

		return true;
	};
	const registProduct = async () => {
		if (dataValidate()) {
			await useProduct.setProductData(utils.changeToFormData(data));
			const result = useProduct.getPrdtResult;

			if (result) {
				alert('상품이 등록되었습니다.');
				router.go();
			} else {
				alert('등록 실패했습니다.');
			}
		}
	};

	watchEffect(() => {
		const regex = /[^0-9]/gi;

		if (regex.test(data.prdtNo)) {
			data.prdtNo = data.prdtNo.replace(regex, '');
		}
	});
	onMounted(() => {
		useProduct.setCateList({
			useYn: 'Y',
			dispYn: 'Y',
		});
	});
</script>
