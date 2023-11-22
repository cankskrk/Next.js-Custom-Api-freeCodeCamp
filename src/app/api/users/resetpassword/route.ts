import Connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {password, token} = reqBody

        const user = await User.findOne({verifyToken: token})

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.password = password
        await user.save()

        return NextResponse.redirect("/login")

    } catch (err: any) {
        NextResponse.json({error: err.message}, {status: 500})
    }
}