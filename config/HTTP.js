const AppEnvironment = process.env.VUE_APP_ENV
const APIAddresses = {
	API_PATH: {
		production: "https://productionUrl.com",
		test: "https://testUrl.com",
		development: "https://developmentUrl.com"
	},
};
export const API_PATH = APIAddresses.API_PATH[AppEnvironment]
