import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLoginAdminMutation } from '../redux/apis/authApi'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

const Login = () => {
    const [login, { isSuccess, isLoading, isError, error }] = useLoginAdminMutation()
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
    const email = classNames({
        "input input-bordered my-2 w-full": true,
        "input-error": formik.errors.email && formik.touched.email,
        "is-valid": formik.touched.email && (!formik.errors.email)
    })
    const password = classNames({
        "input input-bordered my-2 w-full": true,
        "input-error": formik.touched.password && formik.errors.password,
        "is-valid": formik.touched.password && (!formik.errors.password)
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Success")
            navigate("/admin")
        }
        if (isError) {
            toast.success(error)
        }
    }, [isSuccess, isError])

    return <>
        <div className='flex justify-center items-center bg-white h-svh'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <h1 className='text-center text-2xl my-5'>Login</h1>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            {...formik.getFieldProps("email")} type="text" placeholder="Email@gmail.com"
                            className={email} />
                        <span>{formik.errors.email}</span>
                        <input
                            {...formik.getFieldProps("password")} type="text" placeholder="Enter Password"
                            className={password} />
                        <span>{formik.errors.password}</span>
                        <button type='submit' className="btn w-full btn-primary">
                            {
                                isLoading
                                    ? <span className="loading loading-dots loading-lg"></span>
                                    : <h1>Login</h1>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Login