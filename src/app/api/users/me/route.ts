import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Connect from "@/dbConfig/dbConfig";

Connect()

export const GET = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-isAdmin")
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        }, {status: 400})
        
    }
}