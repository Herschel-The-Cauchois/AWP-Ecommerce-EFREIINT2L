<template>
	<div class="user-card">
		<div class="content">
			<h2>{{ user.username }}</h2>
			<p>email: {{ user.email }}</p>
		</div>
		<hr />
		<div class="bottom">
			<div>
				<button v-if="!user.isBanned" @click="banUser"class="dangerous_action">Ban</button>
				<button v-else="user.isBanned" @click="unbanUser" class="dangerous_action">Unban</button>
				<button @click="deleteUser" class="very_dangerous_action">DELETE</button>
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
	const emit = defineEmits(['refreshUsers'])

	const props = defineProps({
		user: { 
			type: Object, 
			required: true 
		} 
	})

	function banUser() {
		axios({
			method: 'lock',
			url: 'http://localhost:5000/users',
			data: {
				user: props.user.id,
				token: localStorage.getItem("user")
			}
		})
		.then(response => {
			console.log(response.data);
			emit('refreshUsers')
		})
		.catch(err => {
			console.error(err);
			console.log(err.response.data)
			console.log(err.response.status)
		});
	}

	function unbanUser() {
		axios({
			method: 'unlock',
			url: 'http://localhost:5000/users',
			data: {
				user: props.user.id,
				token: localStorage.getItem("user")
			}
		})
		.then(response => {
			console.log(response.data);
			emit('refreshUsers')
		})
		.catch(err => {
			console.error(err);
			console.log(err.response.data)
			console.log(err.response.status)
		});

	}

	function deleteUser() {
		// we should ask for confirmation with a popup before deleting

		axios({
			method: 'delete',
			url: 'http://localhost:5000/users',
			data: {
				user: props.user.id,
				token: localStorage.getItem("user")
			}
		})
		.then(response => {
			console.log(response.data);
			emit('refreshUsers')
		})
		.catch(err => {
			console.error(err);
			console.log(err.response.data)
			console.log(err.response.status)
		});

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
	box-shadow: 5px 5px 5px black;
	background-color: #fa8272;
	margin: 10px;
}

button.dangerous_action {
	background-color: orange;
}

button.very_dangerous_action {
	background-color: red;
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
