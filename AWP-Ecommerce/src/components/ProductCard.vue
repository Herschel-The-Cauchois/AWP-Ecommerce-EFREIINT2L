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
				<button v-if="user_login.isLoggedIn" @click="addToCart">price: {{ product.price }}$</button>
				<button v-else="user_login.isLoggedIn" @click="router.push('/log-in')">price: {{ product.price }}$</button>
				<span>rating: {{ product.rating }}</span>
			</div>
		</div>
		<!-- <button @click="deleteProduct">Delete</button> -->
		<!-- <button class="edit_product_button"><RouterLink class="add_product_link" v-if="user_login.isProvider" to="/new" id="new-product-link">+ Add new Product</RouterLink></button> -->
	</div>
</template>

<script setup>
	import axios from 'axios'
	import {user_login} from '../login_info'
	import { useRouter } from 'vue-router'
	import UserService from '../services/UserService.js'

	//const emit = defineEmits(['deleteProduct'])
	const router = useRouter()

	const props = defineProps({
		product: { 
			type: Object, 
			required: true 
		} 
	})

	//function deleteProduct() {
	//	emit("deleteProduct");
	//}

	function addToCart() {
		console.log("user is trying to buy something, adding to cart")
		// this fails with a CORS error, don't know why for now
		//UserService.addToCart({
		//	user: user_login.value.id,
		//	product: props.product.id,
		//	token: localStorage.getItem("user")
		//}).then(res => {
		//    console.log(res.data);
		//}).catch (err => {
		//    console.error(err);
		//    console.log(err.response.data)
		//    console.log(err.response.status)
		//})

		axios({
			method: "put",
			url: "http://localhost:5000/cart",
			data: {
				user: user_login.value.id,
				product: props.product.id,
				token: localStorage.getItem("user")
			},
		}).then(res => {
		    console.log(res.data);
		}).catch (err => {
		    console.error(err);
		    console.log(err.response.data)
		    console.log(err.response.status)
		})
	}
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
