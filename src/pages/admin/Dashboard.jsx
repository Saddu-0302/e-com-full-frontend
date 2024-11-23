import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLogoutMutation } from '../../redux/apis/authApi'
import { Link, Outlet } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useActivateProductMutation, useAdminAddProductMutation, useAdminDeleteProductMutation, useAdminGetAllProductsQuery, useDeActivateProductMutation } from '../../redux/apis/adminApi'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const [deleteProduct] = useAdminDeleteProductMutation()
    const { data } = useAdminGetAllProductsQuery()
    const { admin } = useSelector(state => state.auth)
    const [logout] = useLogoutMutation()
    const [deActivateProduct, { isSuccess: activeSuccess }] = useDeActivateProductMutation()
    const [activateProduct, { isSuccess: deactiveSuccess }] = useActivateProductMutation()
    return <>
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <div className='  p-2 text-white'>
                    <strong>{admin && admin.name}</strong>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/admin/products" className="btn btn-ghost normal-case text-xl">Products</Link>
                <Link to="/admin/order" className="btn btn-ghost normal-case text-xl">Order</Link>
                <Link to="/admin/user" className="btn btn-ghost normal-case text-xl">Users</Link>
            </div>
            <div className="navbar-end">
                <button onClick={logout} className="btn btn-primary">Logout</button>
            </div>
        </div>
        <Outlet />

    </>
}



export default Dashboard