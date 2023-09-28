require('dotenv').config();
const { Configuration, PlaidEnvironments } = require("plaid")
const PORT = 4090;

//Initialize configuration for Plaid client
const configuration = new Configuration({
	basePath: PlaidEnvironments[process.env.PLAID_ENV],
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': process.env.REACT_APP_PLAID_CLIENT_ID,
			'PLAID-SECRET': process.env.REACT_APP_PLAID_SECRET,
		}
	}
});

module.exports = {
	configuration,
};