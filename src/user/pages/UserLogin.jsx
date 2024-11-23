import { useSelector } from 'react-redux'
import { useContinueWithGoogleMutation, useLoginUserMutation, useVerifyOTPMutation } from '../../redux/apis/authApi'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useFormik } from 'formik'
import * as yup from 'yup'

const UserLogin = () => {
    const btnRef = useRef()
    const [otpData, setOtpData] = useState()
    const { user, email } = useSelector(state => state.auth)
    const [verifyOTP, { isSuccess: verified }] = useVerifyOTPMutation()
    const [login, { data, isSuccess, isLoading }] = useLoginUserMutation()
    const [loginWithGoogle, { data: googleData, isSuccess: GoogleLoginSuccess }] = useContinueWithGoogleMutation()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required("Enter Valid Email"),
            password: yup.string().required("Enter Valid Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            login(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (GoogleLoginSuccess) {
            toast.success("Google Login Success")
            localStorage.setItem("auth", JSON.stringify(googleData))
            navigate("/")
        }
    }, [GoogleLoginSuccess])

    useEffect(() => {
        if (isSuccess) {
            toast.success("OTP Send Success")
            btnRef.current.click()
        }
    }, [isSuccess])

    useEffect(() => {
        if (verified) {
            toast.success("User Login Success")
            localStorage.setItem("auth", JSON.stringify(data))
            navigate("/")
        }
    }, [verified])



    return <>
        {/* <!-- component --> */}
        <div className="h-screen text-white">
            <div className="flex w-full h-screen justify-center items-center bg-base-100 space-y-8">
                <div className="w-96">
                    <div className="bg-slate-800 rounded-md shadow-2xl p-5">
                        <h1 className="text-gray-300 font-bold text-2xl mb-8">Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input
                                    {...formik.getFieldProps("email")}
                                    id="email"
                                    className=" pl-2 w-full bg-slate-800 outline-none border-none" type="email"
                                    name="email"
                                    placeholder="user@gmail.com" />
                            </div>
                            <div className="flex items-center border-2  py-2 px-3 rounded-2xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input
                                    {...formik.getFieldProps("password")}
                                    className="pl-2 bg-slate-800 w-full outline-none border-none"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="**********" />

                            </div>
                            <button
                                // type='submit'
                                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 text-white font-semibold ">
                                {
                                    isLoading
                                        ? <span className="loading loading-dots loading-lg"></span>
                                        : <h1>Login</h1>
                                }
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p>you don't have account ? <Link className='text-blue-500' to="/userRegister">Create</Link> </p>
                        </div>
                        <div>
                            <h1 className='text-center text-xl my-3'>Or</h1>
                        </div>
                        <div className='flex justify-center'>
                            <GoogleLogin
                                onSuccess={val => { loginWithGoogle(val) }}
                                onError={err => console.log(err)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>



        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
            ref={btnRef}
            className="btn hidden"
            onClick={() => document.getElementById('otp').showModal()}>open modal</button>
        <dialog id="otp" className="modal">
            <div className="modal-box">
                <h3 className="text-center font-bold text-lg">Enter Your OTP</h3>
                {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                <div className='text-center'>
                    <div>
                        <input
                            onChange={e => setOtpData(e.target.value)}
                            placeholder='Enter OTP'
                            className='input input-bordered w-full text-center my-5'
                            type="text" />
                    </div>
                    <button
                        onClick={e => {
                            document.getElementById("otp").close()
                            verifyOTP({ email: email, otp: otpData })
                        }}
                        className="btn btn-primary">Submit</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog >
    </>
}

export default UserLogin