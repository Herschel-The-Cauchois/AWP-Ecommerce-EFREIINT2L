import VueJwtDecode from 'vue-jwt-decode'
import { defineProps, ref } from 'vue'

const user_login = ref(null)

function getUserDetails() {
	// get token from localstorage
	let token = localStorage.getItem("user");
	try {
		//decode token here and attach to the user object
		let decoded = VueJwtDecode.decode(token);
		user_login.value = decoded;
		console.log('user is logged in')
	} catch (error) {
		// return error in production env
		console.log(error, 'user is not logged in')
	}
}

export {user_login, getUserDetails}
