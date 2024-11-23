import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLogout } from '../../redux/slices/authSlice'
import { toast } from 'react-toastify'
import logo from './../../../public/e-com.png'
const Navbar = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.user)
    const { user, userGoogle } = useSelector(state => state.auth)

    const navigate = useNavigate()

    const handleLogout = (e) => {
        localStorage.removeItem("user")
        dispatch(handleUserLogout())
        navigate("/userLogin")
        toast.success("Logout")
    }
    return <>
        <div className="navbar bg-slate-800 fixed z-10 h-7 text-white top-0">
            <div className="navbar-start">
                <Link to="/" className="">
                    <img src={logo} className='w-20' height={0} alt="" />
                </Link>
            </div>
            <div className="navbar-center">
                {/* <Link className='btn' to="/admin">dashboard</Link> */}
            </div>
            <div className="navbar-end">
                <button onClick={e => navigate("/cart")} className="btn btn-ghost btn-circle">
                    <div
                        className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item">
                            {cart.length}
                        </span>
                    </div>
                </button>
                <div className="dropdown dropdown-bottom dropdown-end   text-white dark:text-white">
                    <button tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu  bg-slate-800 dark:text-white rounded-box z-[1] w-52 p-2 shadow">
                        <li >
                            <Link to="/order">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam-fill" viewBox="0 0 16 16">
                                    <path d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z" />
                                </svg>
                                <a>Order</a>
                            </Link>
                        </li>
                        <li>
                            {
                                user
                                    ? <div onClick={handleLogout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                        </svg>
                                        <a>Logout</a>
                                    </div>
                                    : <Link to="/userLogin">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                        </svg>
                                        <a>Login</a>
                                    </Link>
                            }

                        </li>
                    </ul>
                </div>
                {
                    user
                        ? <h1 className='text-xl mx-5'>{user && user.name}</h1>
                        : <Link to="/userLogin" className='mx-5'>Login </Link>
                }
            </div>
        </div>
        {/* <Outlet /> */}
    </>
}

export default Navbar