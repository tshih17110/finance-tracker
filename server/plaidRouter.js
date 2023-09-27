const express = require("express");
const router = express.Router();
const plaidController = require("./plaidController");

console.log('Plaid router is imported and mounted.');

router.post("/create_link_token", plaidController.createLinkToken);
router.post("/exchange_public_token", plaidController.exchangePublicToken);
router.post("/balance", plaidController.getBalance);

module.exports = {router};