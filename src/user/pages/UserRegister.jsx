import React, { useEffect, useState } from 'react'
import { useRegisterUserMutation } from '../../redux/apis/authApi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const UserRegister = () => {
    const navigate = useNavigate()
    const [register, { isSuccess, isLoading, isError }] = useRegisterUserMutation()
    const [userData, setUserData] = useState()
    const handleChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Register Success")
            navigate("/userLogin")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.success("Email Already Registered")
        }
    }, [isError])
    return <>

        <div class="h-screen ">
            <div class="flex w-full h-screen justify-center items-center bg-base-100 space-y-8">
                <div class="w-96">
                    <div className="bg-slate-800 rounded-md shadow-2xl p-5 text-white">
                        <h1 class="text-gray-300 font-bold text-2xl mb-8">SignUp</h1>
                        <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input
                                onChange={handleChange}
                                className=" pl-2 w-full bg-slate-800 outline-none border-none" type="email"
                                name="name"
                                placeholder="Your Name" />
                        </div>
                        <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                            <input
                                onChange={handleChange}
                                id="email"
                                className=" pl-2 w-full bg-slate-800 outline-none border-none" type="email"
                                name="email"
                                placeholder="Email Address" />
                        </div>
                        <div
                            className="flex items-center border-2  py-2 px-3 rounded-2xl ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input
                                onChange={handleChange}
                                className="pl-2 bg-slate-800 w-full outline-none border-none" type="password"
                                name="password"
                                id="password"
                                placeholder="Password" />

                        </div>
                        <button
                            onClick={e => register(userData)}
                            className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 text-white font-semibold ">
                            {
                                isLoading
                                    ? <span className="loading loading-dots loading-lg"></span>
                                    : <h1>Register</h1>
                            }
                        </button>
                        <div class="text-center mt-4">
                            <p>Already Signup ? <Link
                                className='text-blue-500' to="/userLogin">Login</Link> </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </>
}

export default UserRegister