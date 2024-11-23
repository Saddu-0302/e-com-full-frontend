import { useFormik } from 'formik'
import classNames from 'classnames'
import * as yup from 'yup'
import { useRegisterAdminMutation } from '../redux/apis/authApi'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [register, { isSuccess, isLoading, isError, error }] = useRegisterAdminMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email().required("Enter Valid Email"),
            password: yup.string().required("Enter Password"),
        }),

        onSubmit: (values, { resetForm }) => {
            register(values)
            resetForm()
        }
    })
    const name = classNames({
        "input input-bordered my-2 w-full": true,
        "input-error": formik.errors.name && formik.touched.name,

    })
    const email = classNames({
        "input input-bordered my-2 w-full": true,
        "input-error": formik.errors.email && formik.touched.email,

    })
    const password = classNames({
        "input input-bordered my-2 w-full": true,
        "input-error": formik.errors.password && formik.touched.password,

    })
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success("Register Success")
            navigate("/admin/login")
        }
        if (isError) {
            toast.error(error)
        }
    }, [isSuccess, isError])
    return <>
        <div className='flex justify-center items-center bg-white h-svh'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <h1 className='text-center text-2xl my-5'>Register</h1>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            {...formik.getFieldProps("name")}
                            type="text"
                            placeholder="Enter Name"
                            className={name} />
                        {
                            formik.errors.name
                                ? <span>{formik.errors.name}</span>
                                : ""
                        }

                        <input
                            {...formik.getFieldProps("email")} type="text" placeholder="Email@gmail.com"
                            className={email} />
                        {
                            formik.errors.email && <span>{formik.errors.email}</span>
                        }
                        <input
                            {...formik.getFieldProps("password")} type="text" placeholder="Enter Password"
                            className={password} />
                        {
                            formik.errors.password && <span>{formik.errors.password}</span>
                        }
                        <button type='submit' className="btn w-full btn-primary">
                            {
                                isLoading
                                    ? <span className="loading loading-dots loading-lg"></span>
                                    : <h1>Register</h1>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Signup