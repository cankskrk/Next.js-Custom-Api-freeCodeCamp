import Connect from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

Connect()

export const POST = async (request: NextRequest) => {
    try {
        // get the data sent from body
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        // check if user already exists
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({message: "User created successfully",
        success: true,
        savedUser
        })

    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}