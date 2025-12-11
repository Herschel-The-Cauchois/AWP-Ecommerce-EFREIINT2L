<template>
	<h1>Your cart</h1>
	<div class="cart_products">
		<ProductCard v-for="product in products" :key="product.id" :product="product" :cartView="true" @refreshCart="loadCart"/>
		<p v-if="products.length === 0">Nothing else to see here, you have an empty cart...</p>
	</div>
</template>

<script setup>
	import axios from 'axios' 
	import { ref } from 'vue'
	import ProductCard from '../components/ProductCard.vue'
	import ProductService from '../services/ProductService.js'
	import {user_login} from '../login_info'

	const products = ref(null)

	function loadCart() {
		axios({
			method: "get",
			url: "http://localhost:5000/cart",
			params: {
				token: localStorage.getItem("user")
			},
		}).then(res => {
			console.log(res.data);
			products.value = res.data.data
		}).catch (err => {
		    console.error(err);
		    console.log(err.response.data)
		    console.log(err.response.status)
		})

		//UserService.getCart()
		//	.then(response => {
		//		products.value = response.data.data
		//	})
		//	.catch(error => {
		//		console.log(error)
		//	})
	}
loadCart()
</script>

<style scoped>
.cart_products {
	background-color: beige;
	max-width: 360px;
	padding: 0.5em 0.6em;
	margin: 0 auto;
	border-radius: 4px;
}
</style>
