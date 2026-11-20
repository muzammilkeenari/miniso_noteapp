"use client";

import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { useState,useEffect } from "react";
import {useSession} from "next-auth/react";
import { redirect,useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Add() {

    const router = useRouter();

    const session = useSession();
    const [noteDetails, setNoteDetails] = useState({
        title: "",
        description: "",
        color: "",
        userMail: session?.data?.user?.email || ""
    })
    useEffect(() => {
    if (session.status === "authenticated") {
        setNoteDetails(prev => ({
            ...prev,
            userMail: session.data?.user?.email || ""
        }));
    }
}, [session.status, session.data]);
    if (session?.status === "unauthenticated") {
        redirect('/login')
    }
    if (session?.status === "loading") {
        return <p className="text-center my-10 text-xl">Loading...</p>
    }

    const handleReset=()=>{
        setNoteDetails({
            title: "",
            description: "",
            color: "",
            userMail: session?.data?.user?.email || ""
        })
    }

    
    const handleSubmit = async () => {

    console.log("Note details:", noteDetails);
    console.log("Email:", noteDetails.userMail);

    const { title, description, color, userMail } = noteDetails;

    if (!title.trim() || !description.trim() || !color || !userMail) {
        toast.error("Please fill all the fields");
        return;
    }

    try {
        const response = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteDetails)
        });

        if (response.status === 201) {
            toast.success("Note added successfully");
            handleReset();
            router.push("/notes");
        } else {
            const result = await response.json();
            console.log(result);
            toast.error("Adding note failed!");
        }

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};
    
  return (
    <>
     <div className="w-full h-screen flex justify-center items-center">
            <div className="md:w-1/3 shadow-2xl p-2 rounded-lg bg-amber-50">
                <h1>Add Note</h1>
                <div className="flex justify-between items-center p-2">
                    <button onClick={()=>{handleReset();redirect("/notes")}} className="text-xl">
                        <IoIosClose/>
                    </button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-3xl" onClick={handleSubmit}>
                        Save
                        
                    </button>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Themes:</span>
                    <div className="flex w-1/2 justify-around">
                        <span onClick={()=>setNoteDetails({...noteDetails,color:"pink"})} 
                        className={noteDetails.color === "pink" ? "px-2 border-3 bg-pink-200 rounded-full" : "px-2 border bg-pink-100 rounded-full"}></span>
                        <span onClick={()=>setNoteDetails({...noteDetails,color:"yellow"})} 
                        className={noteDetails.color === "yellow" ? "px-2 border-3 bg-yellow-200 rounded-full" : "px-2 border bg-yellow-100 rounded-full"}></span>
                        <span onClick={()=>setNoteDetails({...noteDetails,color:"sky"})} 
                        className={noteDetails.color === "sky" ? "px-2 border-3 bg-sky-200 rounded-full" : "px-2 border bg-sky-100 rounded-full"}></span>
                        <span onClick={()=>setNoteDetails({...noteDetails,color:"green"})} 
                        className={noteDetails.color === "green" ? "px-2 border-3 bg-green-200 rounded-full" : "px-2 border bg-green-100 rounded-full"}></span>
                    </div>
                </div>
                <div>
                    Title:
                    <input type="text" className="w-full bg-white" value={noteDetails.title} onChange={(e) => setNoteDetails({...noteDetails, title: e.target.value})} />
                    Description:
                    <textarea name="" id="" className="w-full bg-white" value={noteDetails.description} onChange={(e) => setNoteDetails({...noteDetails, description: e.target.value})}></textarea>
                </div>
            </div>
        </div>
    </>
  );
}