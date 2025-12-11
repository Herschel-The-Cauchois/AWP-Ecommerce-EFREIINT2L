import axios from 'axios' 

const apiClient = axios.create({
	baseURL: 'http://localhost:5000',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export default { 
	// requires user id, product id and jwt token
	addToCart(json) {
		return apiClient.put('/cart')
	}
}
