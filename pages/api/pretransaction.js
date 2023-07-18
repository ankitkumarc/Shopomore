// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");
import Order from '@/models/Order';

// Initialize razorpay object
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY
});

async function handler(req, res) {

    // check  if details are valid ---[pending]

    // check if cart items are out of stock --- [pending]

    // Initiate new order
    let cus_order = new Order({
        email: req.body.email,
        OrderId: req.body.oid,
        address: req.body.address,
        amount: req.body.amount,
        products: req.body.cart,

    })
    await cus_order.save();


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