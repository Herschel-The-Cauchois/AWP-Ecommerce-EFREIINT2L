<template>
	<h1>Products list</h1>
	<button class="add_product_button" v-if="user_login.isProvider"><RouterLink class="add_product_link" to="/new" id="new-product-link">+ Add new Product</RouterLink></button>
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
	import {useRoute} from 'vue-router'

	const products = ref(null)

	if (!user_login.value.isProvider) {
		console.log("getting products for regular user")
		ProductService.getProducts()
			.then(response => {
				products.value = response.data.data
			})
			.catch(error => {
				console.log(error)
				console.log(error.response.data)
				console.log(error.response.status)
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

		console.log("logging provider parameter")
		console.log(user_login.value.id)
		axios({
			method: "get",
			url: "http://localhost:5000/products",
			params: {
				providerView: true,
				provider: user_login.value.id,
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

.add_product_button {
	margin: 20px;
	font-size: 2em;
	background-color: lightblue;

	.add_product_link {
		color: #6904ae;
	}
}
</style>
