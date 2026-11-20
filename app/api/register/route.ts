import {connectDB} from "@/lib/mongodb"
import users from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { name, email, password } = body
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await users.create({
                name,
                email,
                password: hashedPassword
            })
            await newUser.save()
            return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "something went wrong!!" }, { status: 500 })
    }
}