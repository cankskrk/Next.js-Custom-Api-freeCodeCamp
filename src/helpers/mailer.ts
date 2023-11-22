// domain.com/verifytoken/abcd
// domain.com/verifytoken?token=abcd

import nodemailer from 'nodemailer'
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.AUTH_USER,
              pass: process.env.AUTH_PASSWORD
            }
          });


        const mailOptions = {
            from: "candev435543@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions)

        return mailresponse

    } catch (err:any) {
        throw new Error(err.message)
        
    }
}