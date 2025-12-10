<template>
	<div class="user-card">
		<div class="content">
			<h2>{{ user.username }}</h2>
			<p>email: {{ user.email }}</p>
		</div>
		<hr />
		<div class="bottom">
			<div>
				<button v-if="!user.isBanned" @click="banUser">Ban</button>
				<button v-else="user.isBanned" @click="unbanUser">Unban</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import {user_login} from '../login_info'
	import { useRouter } from 'vue-router'
	import UserService from '../services/UserService.js'

	const router = useRouter()

	const props = defineProps({
		user: { 
			type: Object, 
			required: true 
		} 
	})

	function banUser() {
		console.log("user has been naughty, hitting them with the good old ban hammer")
	}

	function unbanUser() {
		console.log("user has been behaving nicely after all, lifting ban")
	}
</script>

<style scoped>
:root {
	--primary: white;
	--secondary: #fa8272;
}

.user-card {
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

.user-card button {
	padding: 20px;
	font-size: 1.5em;
	color: white;
	border: none;
	background-color: #fa8272;
	box-shadow: 5px 5px 5px black;
	margin-right: 10px;
}

.user-card button:hover {
	transform: scale(1.01); 
	box-shadow: 10px 5px 12px 0 rgba(0, 0, 0, 0.2); 
}

.user-card:hover {
	transform: scale(1.01);
	box-shadow: 10px 5px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
