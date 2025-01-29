require('dotenv').config()
const payu = require("payu-websdk");


const MERCHANT_KEY = process.env.MERCHANT_KEY;
const MERCHANT_SALT = process.env.MERCHANT_SALT;
const MERCHANT_ENVIRONMENT = process.env.MERCHANT_ENVIRONMENT;
console.log(MERCHANT_ENVIRONMENT)

const payuClient = new payu({
    key: MERCHANT_KEY,
    salt: MERCHANT_SALT
}, MERCHANT_ENVIRONMENT);

module.exports = {
    payuClient,
    MERCHANT_KEY,
    MERCHANT_SALT
};
