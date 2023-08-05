<template>
	<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
		<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h1 class="h2">배너등록</h1>
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">TITLE</span>
			<input v-model="data.title" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">DESCRIPTION</span>
			<input v-model="data.description" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
		</div>
		<div class="input-group mb-3">
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
			<span class="input-group-text">전시시작일</span>
			<input v-model="data.dispStart" type="date" />
			<span class="input-group-text">전시종료일</span>
			<input v-model="data.dispEnd" type="date" />
		</div>
		<div class="input-group mb-3">
			<span class="input-group-text">이미지</span>
			<input @change="imageUpload" class="form-control" type="file" />
		</div>

		<button type="button" class="btn btn-primary" @click="registBanner">등록</button>
	</main>
</template>

<script setup>
	import { reactive } from 'vue';
	import { useStoreBo } from '@/stores/useStoreBackOffice.js';
	import { useUtils } from '@/composables/useUtils.js';

	const isEmpty = useUtils().isEmpty;
	const useBo = useStoreBo();
	const data = reactive({
		bannerType: '10000',
		title: '',
		description: '',
		dispStart: '',
		dispEnd: '',
		useYn: 'Y',
		dispYn: 'Y',
		file: null,
	});
	const imageUpload = (e) => {
		data.file = e.target.files[0];
	};
	const validate = () => {
		if (isEmpty(data.title)) {
			alert('title을 입력해주세요.');
			return false;
		}
		if (isEmpty(data.description)) {
			alert('description을 입력해주세요.');
			return false;
		}
		if (isEmpty(data.dispStart)) {
			alert('전시시작일을 입력해주세요.');
			return false;
		}
		if (isEmpty(data.dispEnd)) {
			alert('전시종료일을 입력해주세요.');
			return false;
		}

		return true;
	};
	const registBanner = () => {
		if (validate()) {
			useBo.registBannerInfo(useUtils().changeToFormData(data));
		}
	};
</script>
