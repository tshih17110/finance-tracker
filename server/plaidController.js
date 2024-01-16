const { PlaidApi } = require("plaid")
const { configuration } = require('./plaidConfig');

const client = new PlaidApi(configuration);

//Create link token
async function createLinkToken(request, response, next) {
	try{
		const clientUserId = "123";
		const linkTokenResponse = await client.linkTokenCreate({
			user: {
				client_user_id: clientUserId,
			},
			client_name: 'Finance Tracker',
			products: ['transactions'],
			country_codes: ['CA'],
			language: 'en',
		});
		response.json(linkTokenResponse.data);
	}
	catch(e){
		console.log(e)
	}
};

//Exchange public token for an access token
async function exchangePublicToken(req, res) {
	try {
		const plaidRequest = {
			public_token: req.body.public_token,
		};

		const plaidResponse = await client.itemPublicTokenExchange(plaidRequest).catch((err) => {
			console.log(err);
		});
		const accessToken = plaidResponse.data.access_token;
		const itemId = plaidResponse.data.item_id;
		res.json({
			access_token: accessToken,
			item_id: itemId,
		});
	} catch (err) {
			console.log(err);
			res.status(500).json({ error: "An error occurred" });
	}
}

//Get account balance
async function getBalance(req, res) {
	try {

		const plaidRequest = {
			access_token: req.body.access_token,
		}
		const balanceResponse = await client.accountsBalanceGet(plaidRequest).catch((err) => {
			console.log(err);
		});
		res.json({
			Balance: balanceResponse.data,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: "An error occurred" });
	}
}

//Transactions sync
async function transactionSync(req, res) {
	try {
		
		//access_token, cursor, itemId
		const plaidRequest = {
			access_token: req.body.access_token,
			cursor: req.body.cursor,
			item_id: req.body.item_id,
		}
		const transactionsResponse = await client.transactionsSync(plaidRequest).catch((err) => {
			console.log(err);
		})
		res.json({
			transactions: transactionsResponse.data,
		})
	} catch (e) {
		console.log(e);
	}
}


module.exports = {
    transactionSync,
	getBalance,
	exchangePublicToken,
	createLinkToken,
};
