const axios = require('axios');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/paymentMomo', async (req, res) => {
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "https://momo.vn/return";
    var ipnUrl = "https://callback.url/notify"; // Replace with your actual IPN URL
    var amount = "50000";
    var requestType = "captureWallet";
    var extraData = ""; // pass empty value if your merchant does not have stores

    // Create raw signature
    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    
    // Calculate signature
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    // JSON object to send to MoMo endpoint
    const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en' // Specify language ('en' for English)
    };

    // MoMo API endpoint URL
    const apiUrl = 'https://test-payment.momo.vn/v2/gateway/api/create';

    try {
        // Send POST request using Axios
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(requestBody))
            }
        });

        console.log('Response from MoMo API:', response.data);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling MoMo API:', error.message);
        return res.status(500).json({ message: 'Error calling MoMo API' });
    }
});

module.exports = router;
