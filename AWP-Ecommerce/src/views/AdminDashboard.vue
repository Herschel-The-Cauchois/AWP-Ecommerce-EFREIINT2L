<template>
	<h1>Admin Dashboard</h1>
	<div class="users">
		<UserCard v-for="user in users" :key="user.id" :user="user"/>
		<p v-if="users.length === 0">Nothing else to see here, you have an empty user list...</p>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { ref } from 'vue'
	import UserCard from '../components/UserCard.vue'
	import {user_login} from '../login_info'

	const users = ref(null)

	console.log("fetching list of users")
	// would be better to use a service
	axios({
		method: 'get',
  		url: 'http://localhost:5000/users',
  		params: {
			token: localStorage.getItem("user")
		}
	})
	.then(response => {
		console.log(response.data);
		users.value = response.data.data
  	})
	.catch(err => {
		console.error(err);
    	    	console.log(err.response.data)
    	    	console.log(err.response.status)
  	});
</script>

<style scoped>

.users {
	margin: 0 auto;
	display: block;
	max-width: 22em;
}

</style>
