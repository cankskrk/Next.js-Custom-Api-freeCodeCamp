import Connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer";

Connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {resetEmail} = reqBody

        const user = await User.findOne({email: resetEmail})
        
        if (!user) {
            return NextResponse.json({error: "There is no user"}, {status: 400})
        }

        sendEmail({email: resetEmail, emailType: 'RESET', userId: user._id})

        return NextResponse.redirect("/login")

    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
        
    }
}