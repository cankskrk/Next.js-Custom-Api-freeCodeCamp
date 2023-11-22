import Connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"

Connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody

        const user = await User.findOne({forgetPasswordToken: token, forgetPasswordTokenExpiry: {$gt: Date.now()}})
        
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.password = password
        user.forgetPasswordToken = undefined
        user.forgetPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "The password has changed successfully",
            success: true
        })

    } catch (err: any) {
        NextResponse.json({error: err.message}, {status: 500})
        
    }
}