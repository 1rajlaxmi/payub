
const { response } = require("express")
const {payuClient , MERCHANT_KEY , MERCHANT_SALT} = require("../config/PayU.config")
const {generateHash} = require("../utils/hash.js")

const STATUS_URL = process.env.STATUS_URL

const initiatePayment = (req , res)=>{

        const PORT = process.env.PORT
        const {firstname , email , amount } = req.body
    const txnid = Date.now();
    
    const productinfo = "test"
    const phone = 9199666129
    const hash = generateHash(MERCHANT_KEY , txnid , amount , productinfo , firstname , email , MERCHANT_SALT);
    console.log(MERCHANT_KEY, "       " , MERCHANT_SALT)
  
    const data = {
        txnid : txnid,
        amount : amount,
        productinfo : productinfo,
        firstname : firstname,
        email : email,
        phone : phone,
        surl : `http://localhost:${PORT}/api/verifypayment/${txnid}`,
        furl : `http://localhost:${PORT}/api/verifypayment/${txnid}`,
        hash:hash
    }

 
   const paydata =  payuClient.paymentInitiate(data)
 
    res.send(paydata)

}



const verifypayment = async(req , res ) =>{
    
    const paymentId = req.params.txnid;

// Ensure paymentId is correctly retrieved
console.log("Payment ID:", paymentId);

// Verify the payment with PayU
const response = await payuClient.verifyPayment(paymentId);

console.log("PayU Response:", response); // Debugging

if (!response || !response.transaction_details || !response.transaction_details[paymentId]) {
  return res.status(400).json({ error: "Invalid transaction ID or missing details" });
}

// Extract payment details
const paymentDetails = response.transaction_details[paymentId];

console.log("Extracted Payment Details:", paymentDetails);

// Destructure safely
const { txnid, amt, status } = paymentDetails;

// Redirect with transaction details
res.redirect(`${STATUS_URL}/paymentstatus/${txnid}/${amt}/${status}`);

}


module.exports = {
    initiatePayment, 
    verifypayment
}