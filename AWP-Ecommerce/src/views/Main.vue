<template>
	<h1>Products list</h1>

	<article>
		<label for="category-select">Filter by Category :</label>
		<select v-model="selected_category">
			<option value="None">Do not filter</option>
			<option>Event</option>
			<option>Food</option>
			<option>Rex</option>
		</select>
	</article>

	<button class="add_product_button" v-if="user_login.isProvider"><RouterLink class="add_product_link" to="/new" id="new-product-link">+ Add new Product</RouterLink></button>
	<div class="products">
		<ProductCard v-for="product in products" :key="product.id" :product="product"/>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { ref, watch } from 'vue'
	import ProductCard from '../components/ProductCard.vue'
	import ProductService from '../services/ProductService.js'
	import {user_login} from '../login_info'
	import {useRoute} from 'vue-router'

	const products = ref(null)
	const selected_category = ref(null)

	function loadProducts(category) {
		if (!category) {
			console.log("load all items")
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
		} else {
			console.log("load items by category")
			axios({
				method: "get",
				url: "http://localhost:5000/products/" + category,
			}).then(res => {
				console.log(res.data)
				products.value = res.data.data
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

article {
	padding: 2em 0.8em;
	color: white;
	background-color: #89F336;
}

article > label {
	text-decoration: underline;
	font-weight: 650;
}

article > select {
	text-decoration: none;
	padding: 0.2em 0.4em;
	margin-left: 1em;
	border: 2px solid black;
	border-radius: 4px;
}

</style>
