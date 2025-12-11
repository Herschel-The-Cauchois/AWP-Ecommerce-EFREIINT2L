<template>
	<h1>Products list</h1>

	<label for="name">Filter by name:</label>

	<input type="text" id="name-filter" v-model="name_filter" />

	<label for="category-select">Filter by Category: </label>
	<select v-model="selected_category">
		<option value="None">Do not filter</option>
		<option>Event</option>
		<option>Food</option>
		<option>Rex</option>
	</select>

	<button class="add_product_button" v-if="user_login.isProvider"><RouterLink class="add_product_link" to="/new" id="new-product-link">+ Add new Product</RouterLink></button>
	<div class="products">
		<ProductCard v-for="product in filtered_products" :key="product.id" :product="product"/>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { ref, watch } from 'vue'
	import ProductCard from '../components/ProductCard.vue'
	import ProductService from '../services/ProductService.js'
	import {user_login} from '../login_info'

	const fetched_products = ref(null)
	const filtered_products = ref(null)
	const selected_category = ref(null)
	const name_filter = ref(null)

	function loadProducts(category) {
		if (!category) {
			console.log("load all items")
			if (!user_login.value.isProvider) {
				console.log("getting products for regular user")
				ProductService.getProducts()
					.then(response => {
						fetched_products.value = response.data.data
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
					fetched_products.value = res.data.data
				}).catch (err => {
				    console.error(err);
				    console.log(err.response.data)
				    console.log(err.response.status)
				})
			}
		} else {
			console.log("load items by category")
			axios({
				method: "get",
				url: "http://localhost:5000/products/" + category,
			}).then(res => {
				console.log(res.data)
				fetched_products.value = res.data.data
			}).catch (err => {
			    console.error(err);
			    console.log(err.response.data)
			    console.log(err.response.status)
			})
		}
	}
	loadProducts(false)

	watch(selected_category, async (new_category) => {
		console.log("category changed!")
		console.log(new_category)
		if (new_category != "None") {
			console.log("category is not none")
			loadProducts(new_category)
		} else {
			console.log("category is none")
			loadProducts(false)
		}
	})

	watch(name_filter, async (new_filter) => {
		console.log("name filter changed!")
		console.log(new_filter)
		if (new_filter != "") {
			filtered_products.value = fetched_products.value.filter((product) => product.name.substring(0, new_filter.length) == new_filter)
		} else {
			filtered_products.value = fetched_products.value
		}
	})

	watch(fetched_products, async (new_fetched_products) => {
		filtered_products.value = new_fetched_products
	})
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
