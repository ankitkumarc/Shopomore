// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");

// Initialize razorpay object
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY
});

async function handler(req, res) {
    console.log(req.body.amount);
    const amount = req.body.amount * 100
    const currency = "INR";
    const options = {
        amount: amount,
        currency: currency,
        receipt: shortid.generate(),
    };
    let order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
}
export default handler