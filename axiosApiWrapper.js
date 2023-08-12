import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {API_PATH} from './config/HTTP'
import JWT from './JWT'
import {interceptorFunctions} from "./interceptors";

const axiosApiWrapper = {
	init() {
		Vue.use(VueAxios, axios)
		Vue.axios.defaults.baseURL = API_PATH
		Vue.axios.interceptors.response.use(interceptorFunctions.response.onFullFilled,interceptorFunctions.response.onRejected)
		Vue.axios.interceptors.request.use(interceptorFunctions.request.onFullFilled,interceptorFunctions.request.onRejected)
	},
	
	removeAuthorizationHeader() {
		delete axios.defaults.headers.common['Authorization']
	},

	addAuthorizationHeader() {
		Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JWT.getToken()}`
		Vue.axios.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate'
		Vue.axios.defaults.headers.common['Pragma'] = 'no-cache'
		Vue.axios.defaults.headers.common['Expires'] = '0'
	},

	updateHeader(hName, hValue) {
		Vue.axios.defaults.headers[hName] = hValue;
	},

	retryApiCall(apiError) {
		const {config: oldRequest} = apiError
		Vue.axios.request({...oldRequest}).then(r => (r))
	},
	
	// Methods
	query(resource, params, config) {
		return Vue.axios.get(resource, params, config)
	},

	get(resource, config) {
		return Vue.axios.get(`${resource}`, config)
	},

	post(resource, params, config) {
		return Vue.axios.post(`${resource}`, params, config)
	},

	update(resource, slug, params, config) {
		return Vue.axios.put(`${resource}/${slug}`, params, config)
	},

	put(resource, params, config) {
		return Vue.axios.put(`${resource}`, params, config)
	},

	delete(resource, params, config) {
		return Vue.axios.delete(resource, params, config)
	},
}

export default axiosApiWrapper