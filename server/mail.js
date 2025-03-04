import nodemailer from 'nodemailer';

//function to send email 

console.log(process.env.EMAIL)
const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email", // smtp provide
            // port:587,
            // secure:false,
            service:"gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
            
        })

        const option = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP for verification',
            text: `Your OTP is ${otp}`,
            html:"<h1>OTP for verification</h1> <p>Your OTP is <b>" + otp + "</b></p>"
        }
        const info = await transporter.sendMail(option)
        console.log("Email sent", info.response)
    } catch (error) {
        console.error("Failed to send email", error)
        throw new Error("Failed to send email")
    }


}

export default sendEmail





