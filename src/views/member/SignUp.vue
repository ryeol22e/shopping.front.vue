<template>
	<main class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">sign up plaase.</h1>

		<div class="form-floating">
			<input type="email" class="form-control" id="email" placeholder="name@example.com">
			<label for="email">Email address</label>
		</div>
		<div class="form-floating">
			<input type="text" class="form-control" id="userName" placeholder="홍길동">
			<label for="userName">Name</label>
		</div>
		<div class="form-floating">
			<input type="password" class="form-control" id="password" placeholder="Password">
			<label for="password">Password</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
	</main>
</template>

<script setup></script>

<style scoped>
	@import '../../assets/css/signin.css';
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
		background-color: rgba(0, 0, 0, .1);
		border: solid rgba(0, 0, 0, .15);
		border-width: 1px 0;
		box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
	}

	.b-example-vr {
		flex-shrink: 0;
		width: 1.5rem;
		height: 100vh;
	}

	.bi {
		vertical-align: -.125em;
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