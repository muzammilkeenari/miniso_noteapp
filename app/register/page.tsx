"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"



export default function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    const router = useRouter()

    const handleRegister = async()=>{
        console.log(user)
        const {name,email,password} = user
        if(!name || !email || !password) {
            toast.error("Please fill all the fields")
            return
        }
        else{
            const response = await fetch("/api/register",{
                method:"POST",
                body:JSON.stringify(user)
            })
            console.log(response)
            const res = await response.json()
            console.log(res)

            if(response.status === 201){ 
                toast.success("User registered successfully")
                router.push("/login")
            } 
            else {
                toast.error("Registration failed!!")
            }
            setUser({
                name: "",
                email: "",
                password: ""
            })
        }
    }
    return (
        <>
        <div className="min-h-screen w-full flex justify-center items-center">
                <div className="border-2 border-blue-300 rounded-2xl p-3 w-100 bg-blue-100 shadow-2xl">
                    <h1 className="text-center my-2 text-4xl">User Registration</h1>

                    <div>
                         <div className="mt-5 mb-3 w-full">
                            <input
                                type="text"
                                placeholder="Full Name"
                                onChange={(e)=>setUser({...user,name:e.target.value})}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>
                        <div className="mt-5 mb-3 w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e)=>setUser({...user,email:e.target.value})}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>

                        <div className="mb-3 w-full">
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setUser({...user,password:e.target.value})}
                                className="rounded bg-gray-100 p-3 w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-1">
                            <button className="p-3 bg-green-600 text-white rounded" onClick={handleRegister}>
                                Register
                            </button>

                            <Link
                                href={'/login'}
                                className="p-3 bg-yellow-300 text-center rounded"
                            >
                                Already a user?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}