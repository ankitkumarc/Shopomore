export default async function handler(req, res) {
    let order_id = await req.body.razorpay_order_id;
    let payment_id = await req.body.razorpay_payment_id;
    let signature = await req.body.razorpay_signature;

    let bdy = order_id + "|" + payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_KEY)
        .update(bdy.toString())
        .digest('hex');
    console.log("sig received ", signature);
    console.log("sig generated ", expectedSignature);

    var response = { "signatureIsValid": "false" }

    if (expectedSignature === signature)
        response = { "signatureIsValid": "true" }
    res.status(200).json({ success: true, response });
}
