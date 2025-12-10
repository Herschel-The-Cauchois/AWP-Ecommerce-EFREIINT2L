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
				<p>price: {{ product.price }}</p>
				<p>rating: {{ product.rating }}</p>
			</div>
		</div>
		<!-- <button @click="deleteProduct">Delete</button> -->
	</div>
</template>

<script setup>
	//const emit = defineEmits(['deleteProduct'])

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
.product-card { 
	padding: 20px; 
	width: 250px; 
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

.product-card:hover { 
	transform: scale(1.01); 
	box-shadow: 10px 5px 12px 0 rgba(0, 0, 0, 0.2); 
}
</style>
