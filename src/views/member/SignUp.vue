<template>
	<main class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Please sign up</h1>

		<div class="form-floating">
			<input type="text" class="form-control" id="userName" placeholder="홍길동" v-model="data.memberName" />
			<label for="userName">Name</label>
		</div>
		<div class="form-floating">
			<input type="text" class="form-control" id="address" placeholder="Address" v-model="data.memberAddr" />
			<label for="address">Adress</label>
		</div>
		<div class="form-floating">
			<input type="text" class="form-control" id="memberId" placeholder="user123" v-model="data.memberId" />
			<label for="memberId">Member Id</label>
		</div>
		<div class="form-floating">
			<input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="data.memberEmail" />
			<label for="email">Email address</label>
		</div>
		<div class="form-floating">
			<input type="password" class="form-control" id="password" placeholder="Password" v-model="data.memberPassword" />
			<label for="password">Password</label>
		</div>
		<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
			<div class="form-floating">
				<input type="text" class="form-control" id="authNumber" placeholder="인증번호" v-model="data.authNumber" />
				<label for="authNumber">인증번호</label>
			</div>
			<div class="btn-group me-2" role="group" aria-label="First group">
				<button class="btn btn-primary" type="button" @click="getAuthNumber">인증번호 받기</button>
			</div>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="button" @click="signUp">Sign up</button>
	</main>
</template>

<script setup>
	import useStoreMember from '@/stores/useStoreMember';
	import { reactive } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const useMember = useStoreMember();
	const data = reactive({
		memberId: '',
		memberPassword: '',
		memberName: '',
		memberEmail: '',
		memberAddr: '',
		authNumber: '',
		tempYn: 'Y',
	});
	const validate = () => {
		if (data.memberId === '') {
			alert('아이디를 입력해주세요.');
			return false;
		}
		if (data.memberPassword === '') {
			alert('비밀번호를 입력해주세요.');
			return false;
		}
		if (data.memberName === '') {
			alert('이름을 입력해주세요.');
			return false;
		}
		if (data.memberEmail === '') {
			alert('이메일을 입력해주세요.');
			return false;
		}
		if (data.memberAddr === '') {
			alert('주소를 입력해주세요.');
			return false;
		}

		return true;
	};
	const signUp = async () => {
		if (validate()) {
			const sessionAuthNum = decodeURIComponent(sessionStorage.getItem('authNumber'));
			const inputAuthNum = data.authNumber;

			if (sessionAuthNum === inputAuthNum) {
				data.tempYn = 'N';
				useMember.signUpProcess(data);
				const signResult = await useMember.getSignUpResult;

				setTimeout(() => {
					if (signResult) {
						alert('가입이 완료되었습니다.');

						sessionStorage.removeItem('authNumber');
						router.push('/');
					}
				}, 100);
			}
		}
	};
	const getAuthNumber = async () => {
		if (validate()) {
			useMember.setAuthNumber(data);
			const authNumber = await useMember.getAuthNumber;

			sessionStorage.setItem('authNumber', authNumber);
			alert(`인증번호는 "${authNumber}"입니다.`);
		}
	};
</script>

<style scoped>
	@import '@/assets/css/signin.css';
	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	@media (min-width: 768px) {
		.bd-placeholder-img-lg {
			font-size: 3.5rem;
		}
	}

	.b-example-divider {
		height: 3rem;
		background-color: rgba(0, 0, 0, 0.1);
		border: solid rgba(0, 0, 0, 0.15);
		border-width: 1px 0;
		box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
	}

	.b-example-vr {
		flex-shrink: 0;
		width: 1.5rem;
		height: 100vh;
	}

	.bi {
		vertical-align: -0.125em;
		fill: currentColor;
	}

	.nav-scroller {
		position: relative;
		z-index: 2;
		height: 2.75rem;
		overflow-y: hidden;
	}

	.nav-scroller .nav {
		display: flex;
		flex-wrap: nowrap;
		padding-bottom: 1rem;
		margin-top: -1px;
		overflow-x: auto;
		text-align: center;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
	}
</style>
