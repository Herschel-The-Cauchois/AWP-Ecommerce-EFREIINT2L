<template>
	<div class="product-card">
		<img :src="product.imgurl" />
		<div class="content">
			<h2>{{ product.name }}</h2>
			<p>{{ product.description }}</p>
			<p>Category: {{ product.category }}</p>
		</div>
		<hr />
		<div class="bottom">
			<div>
				<p>start: {{ product.start }}</p>
				<p>end: {{ product.end }}</p>
			</div>
			<div>
				<button v-if="user_login.isLoggedIn" @click="console.log('user trying to buy something, we should add to cart')">price: {{ product.price }}$</button>
				<button v-else="user_login.isLoggedIn" @click="router.push('/log-in')">price: {{ product.price }}$</button>
				<span>rating: {{ product.rating }}</span>
			</div>
		</div>
		<!-- <button @click="deleteProduct">Delete</button> -->
	</div>
</template>

<script setup>
	import {user_login} from '../login_info'
	import { useRouter } from 'vue-router'
	//const emit = defineEmits(['deleteProduct'])
	const router = useRouter()

	defineProps({
		product: { 
			type: Object, 
			required: true 
		} 
	})

	//function deleteProduct() {
	//	emit("deleteProduct");
	//}
</script>

<style scoped>
:root {
	--primary: white;
	--secondary: #fa8272;
}

.product-card {
	padding: 20px;
	width: 300px;
	cursor: pointer;
	border: 2px solid #39495c;
	margin: 10px;

	background-color: white;
	border-radius: 15px;

	img {
		width: 100%;
		height: 30%;
	}
}

.product-card button {
	padding: 20px;
	font-size: 1.5em;
	color: white;
	border: none;
	background-color: #fa8272;
	box-shadow: 5px 5px 5px black;
	margin-right: 10px;
}

.product-card button:hover {
	transform: scale(1.01); 
	box-shadow: 10px 5px 12px 0 rgba(0, 0, 0, 0.2); 
}

.product-card:hover {
	transform: scale(1.01);
	box-shadow: 10px 5px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
