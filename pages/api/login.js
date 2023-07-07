// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email });
        const bytes = CryptoJS.AES.decrypt(user.password, 'secret123');

        // console.log(bytes.toString(CryptoJS.enc.Utf8))
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({ email: user.email, name: user.name }, 'secret321');
                console.log(token)
                res.status(200).json({ success: true, token });
            }
            else {
                res.status(400).json({ success: false, error: "Invalid Credentials" });
            }
        }
    }
    else {
        res.status(400).json({ success: false, error: "No User found" });
    }

}


export default connectDB(handler);