<template>
	<h1>Products list</h1>
	<template v-if="user_login">
		<RouterLink v-if="user_login.isProvider" to="/new" id="new-product-link">Add new Product</RouterLink>
	</template>
	<div class="products">
		<ProductCard v-for="product in products" :key="product.id" :product="product"/>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { ref } from 'vue'
	import ProductCard from '../components/ProductCard.vue'
	import ProductService from '../services/ProductService.js'
	import {user_login} from '../login_info'

	const products = ref(null)

	if (!user_login.value.isProvider) {
		console.log("getting products for regular user")
		ProductService.getProducts()
			.then(response => {
				products.value = response.data.data
			})
			.catch(error => {
				console.log(error)
			})
	} else {
		console.log("getting products for a provider")
		//UserService.getProviderProducts()
		//	.then(response => {
		//		products.value = response.data.data
		//	})
		//	.catch(error => {
		//		console.log(error)
		//	})

		axios({
			method: "get",
			url: "http://localhost:5000/products",
			data: {
				providerView: true,
				provider: user_login.id,
				token: localStorage.getItem("user")
			},
		}).then(res => {
			products.value = res.data.data
		}).catch (err => {
		    console.error(err);
		    console.log(err.response.data)
		    console.log(err.response.status)
		})
	}
</script>

<style scoped>
.products {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background-color: beige;
}
</style>
