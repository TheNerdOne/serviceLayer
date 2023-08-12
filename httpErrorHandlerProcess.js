import authDataProvider from "./services/auth";
import JWT from "./JWT";

const httpErrorHandlerProcess = async (err) => {
	const {status} = err.response
	const accessToken = JWT.getToken()
	const refreshToken = JWT.getRefreshToken()
	JWT.deleteToken(accessToken)
	setTimeout(() => {
	}, 0)
	switch (status) {
		case 401:
			const res = await authDataProvider.refreshToken(accessToken, refreshToken)
			if (res.data && res.data.status === 'OK') {
				const {accessToken, refreshToken} = res.data.data
                //dispatch tokens to stores
				JWT.setToken(accessToken);
				JWT.setRefreshToken(refreshToken)
				return true
			} else {
				return false
			}
			break;
		case 403:
            //clear all configs from store & storages
            //push to login page
			break;
	}
}

export default httpErrorHandlerProcess