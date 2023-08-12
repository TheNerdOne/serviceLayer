import {cookieFuns} from './cookies'

export const TOKEN_KEY = 'token'
export const REFRESH_TOKEN_KEY = 'refresh-token'
const cookie = new cookieFuns()

export const getToken = () => {
	return cookie.getCookie(TOKEN_KEY)
}
export const getRefreshToken = () => {
	return cookie.getCookie(REFRESH_TOKEN_KEY)
}

export const setToken = token => {
	if (!token || token.length === 0 || typeof token !== 'string') return
	cookie.setCookie(TOKEN_KEY,token,1)
}

export const setRefreshToken = token => {
	if (!token || token.length === 0 || typeof token !== 'string') return
	cookie.setCookie(REFRESH_TOKEN_KEY,token,30)
}

export const deleteToken = (token) => {
	cookie.setCookie(TOKEN_KEY,token,0)
	// window.localStorage.removeItem(TOKEN_KEY)
}
export const deleteRefreshToken = () => {
	cookie.setCookie(REFRESH_TOKEN_KEY,'')
	// window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export default { TOKEN_KEY, getToken, setToken, deleteToken, REFRESH_TOKEN_KEY, getRefreshToken, setRefreshToken, deleteRefreshToken }
