// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { name, email } = req.body
        let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secret123') })
        await u.save()
        res.status(400).json({ success: "success" });
    }
    else {
        res.status(400).json({ error: "Invalid method" });
    }

}

export default connectDB(handler);