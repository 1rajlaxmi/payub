const crypto = require('crypto');

function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
    const udf1 = ""
    const udf2 = ""
    const udf3 = ""
    const udf4 = ""
    const udf5 = ""
    const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    return crypto.createHash('sha512').update(input).digest('hex');
}


module.exports ={
    generateHash
}