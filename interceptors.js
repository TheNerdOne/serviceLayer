import httpErrorHandlerProcess from "./httpErrorHandlerProcess";
import JWT from "./JWT";
import axiosApiWrapper from "./axiosApiWrapper";

export const interceptorFunctions =  {
	response: {
		onFullFilled: async function (response) { // range of 2xx 
			if (response.data.code === 200) { // success 
				await (response.data.status = "OK");
			} else if (response.data.code === 500) { // err message should be toasted
                // do something with error message 
			}
			return response;
		},
		onRejected: async function (error) { // outside the range of 2xx
			if (await httpErrorHandlerProcess(error)) {
				await axiosApiWrapper.retryApiCall(error)
			} else {
				return Promise.reject(error);
			}
		}
	},
	request: {
		onFullFilled: async (config) => {
			if (await JWT.getToken()) {
				axiosApiWrapper.addAuthorizationHeader();
				await (config.headers.Authorization = `Bearer ${JWT.getToken()}`)
			} else {axiosApiWrapper.removeAuthorizationHeader();}
			return config;
		},
		onRejected: (error) => {
			return Promise.reject(error);
		}
	}
}