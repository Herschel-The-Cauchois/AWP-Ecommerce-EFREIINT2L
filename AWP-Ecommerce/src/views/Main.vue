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
	import { ref } from 'vue'
	import ProductCard from '../components/ProductCard.vue'
	import ProductService from '../services/ProductService.js'
	import {user_login} from '../login_info'

	//console.log("user_login in main")
	//console.log(user_login.value.isProvider)
	const products = ref(null)

	ProductService.getProducts()
		.then(response => {
			products.value = response.data.data
			console.log("products list value")
			console.log(products.value)
		})
		.catch(error => {
			console.log(error)
		})
</script>

<style scoped>
.products {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background-color: beige;
}
</style>
