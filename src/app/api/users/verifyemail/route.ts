import Connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"

Connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email has verified succesfully",
            success: true
        })
    } catch (err:any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}