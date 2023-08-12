import AUTH from "../config/path/AUTH";
import axiosApiWrapper from "../axiosApiWrapper";

const authDataProvider = {
	async refreshToken(accessToken, refreshToken,config) {
		return await axiosApiWrapper['post'](AUTH.refreshToken, { accessToken, refreshToken }, config)
	},
}
export default authDataProvider