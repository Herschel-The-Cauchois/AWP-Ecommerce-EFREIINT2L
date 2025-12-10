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
	getProducts() {
		return apiClient.get('/products')
	},
	addProduct(json) {
		return apiClient.put('/products/', json)
	}
}
