"use client"
import Link from "next/link"    
import {useSession,signOut} from "next-auth/react"
import {redirect} from "next/navigation"
import { FaEdit, FaPowerOff, FaTrash, FaUser } from "react-icons/fa"
import { CiCalendarDate } from "react-icons/ci"
import { useState,useEffect } from "react"
import { toast } from "react-hot-toast"

interface Note {
    _id: string;
    title: string;
    description: string;
    color: string;
    userMail: string;
    createdAt: string;
}
export default  function Notes(){
    const session = useSession()
    console.log(session)
    const [notes, setNotes] = useState<Note[]>([])

//     const getNotes = async()=>{
//     const response = await fetch("/api/notes")
//     if(response.status === 200){
//         const result = await response.json()
//         console.log(result)
//         setNotes(result.filter((note:any)=>note.userMail == session?.data?.user?.email))
//     }
// }

    const getNotes = async () => {
    const response = await fetch("/api/notes")

    if (response.status === 200) {
        const result = await response.json()

        console.log("All notes:", result)
        console.log("User email:", session.data?.user?.email)

        setNotes(
            result.filter(
                (note: any) =>
                    note.userMail === session.data?.user?.email
            )
        )
    }
}

const handleDelete = async (id: any) => {
    const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
    })

    if (response.status === 200) {
        toast.success("Note deleted successfully")
        getNotes() // Refresh the notes list after deletion

    } else {
        toast.error("Failed to delete note")
    }
}

   useEffect(() => {
    if (session.status === "authenticated") {
        getNotes()
    }
}, [session.status, session.data?.user?.email])

    if (session?.status === "unauthenticated") {
        redirect('/login')
    }
    if (session?.status === "loading") {
        return <p className="text-center my-10 text-xl">Loading...</p>
    }
    return(
        <>
        <div className="md:mx-40 m-5">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div className="text-xl flex items-center text-blue-400">
                    <span className="ms-2">Miniso</span>
                </div>
                <div className="text-xl flex items-center text-blue-400">
                   <p className="me-5 flex items-center">
            <FaUser />{' '}
            {session?.data?.user?.name}
        </p>

        <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="border border-black p-3 rounded hover:bg-red-500 hover:text-white">
            <FaPowerOff />
        </button>
                </div>
            </div>

            {/* note */}
            <div className="bg-gray-200 p-5 rounded grid md:grid-cols-4 gap-2">
                
                {

                notes.map((item: Note) => (

                <div className={`bg-${item.color}-200 p-3 rounded-lg flex flex-col justify-between`} key={item._id}>
                    
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold">{item.title}</h1>
                     <Link href={`/notes/${item._id}`} className="text-blue-500 text-sm "><FaEdit /></Link>

                    </div>
                    <div>
                        <span className="font-semibold">Description :</span>
                        <p>
                            {item.description}
                        </p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm font-light text-gray-400 flex gap-2 items-center">
                            <CiCalendarDate />
                            {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <button onClick={() => handleDelete(item._id)} className="text-red-600">
                            <FaTrash />
                        </button>

                    </div>
                </div>
                    )
                )
                }
            </div>


            {/* add note */}
            <div className="border border-black p-3 rounded bg-white flex justify-center items-center text-2xl cursor-pointer" onClick={() => (window.location.href = '/notes/add')}>
                <FaEdit />
            </div>
        </div>
        </>
    )
}


