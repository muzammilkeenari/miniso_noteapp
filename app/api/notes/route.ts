import {connectDB} from "@/lib/mongodb"
import notes from "@/models/noteModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const newNote = await notes.create(body)
        return NextResponse.json(newNote,{ status:201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "something went wrong!!" }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectDB()
        const noteList = await notes.find()
        return NextResponse.json(noteList,{ status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "something went wrong!!" }, { status: 500 })
    }
}