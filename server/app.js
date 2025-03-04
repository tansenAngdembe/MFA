import "dotenv/config"
import express from "express";

import cors from "cors"
import bodyParser from "body-parser";
import randomize from "randomatic";

import { connect } from "./connection.js";
import { User } from "./model.js";
import sendEmail from "./mail.js";
// const connect = require("./connection")


const app = express()
app.use(bodyParser.json())
app.use(cors())
const PORT = process.env.PORT || 5100
const uri = process.env.MONGODB_URI;


app.get("/user", async (req, res) => {
    const user = await User.find()
    res.status(200).json(user)

})

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password})
        await user.save()
        res.status(200).json({ message: "User registered successfully" })

    } catch (error) {
        console.error("Failed to register", error)
        res.status(500).json({ message: "Failed to register" })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password })
        if (!user) {
            res.status(400).json({ message: "User not found", success: false })
        }
        const genOtp = randomize('0', 6);
        user.otp = genOtp;
        await user.save();
        await sendEmail(email, genOtp);
        res.status(200).json({ message: "OTP sent to your email", success: true })

    } catch (error) {
        console.error("Failed to login", error)
        res.status(500).json({ message: "Failed to login" })

    }

})

app.post("/verify", async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otp });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid OTP" })
        }
        user.otp = null;
        await user.save();
        res.status(200).json({ success: true })

    } catch (error) {
        console.error("Error during OTP verification", error.message)

    }
})











const start = async () => {
    try {
        await connect(uri);
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (error) {
        console.error("Failed to start the server", error)
        process.exit(1)

    }
}
start()