const express = require("express");
const cors = require("cors")
const router = express.Router();
const { initiatePayment, verifypayment } = require("../controllers/payment.controller.js"); // Ensure the controller path is correct

// Define your routes


router.post("/initiate", initiatePayment);
router.post("/verifypayment/:txnid" , verifypayment)
// Export the router properly
module.exports = {
    paymentRouter: router, // Named export
};
