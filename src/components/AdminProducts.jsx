import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { toast } from 'react-toastify'
import { useLogoutMutation } from '../redux/apis/authApi'
import { useActivateProductMutation, useAdminAddProductMutation, useAdminDeleteProductMutation, useAdminGetAllProductsQuery, useDeActivateProductMutation } from '../redux/apis/adminApi'

const AdminProducts = () => {
    const [deleteProduct] = useAdminDeleteProductMutation()
    const { data } = useAdminGetAllProductsQuery()
    const { admin } = useSelector(state => state.auth)
    const [logout] = useLogoutMutation()
    const [deActivateProduct, { isSuccess: activeSuccess }] = useDeActivateProductMutation()
    const [activateProduct, { isSuccess: deactiveSuccess }] = useActivateProductMutation()
    return <>

        {/*  */}
        <div class="">

            <div class="p-4 ">


                <div className='text-end my-3'>
                    <button className="btn btn-primary" onClick={() => window.my_modal_3.showModal()}>+ Product</button>
                </div>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                {
                    data && <table
                        className={`table mt-10 `}>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>desc</th>
                                <th>price</th>
                                <th>stock</th>
                                <th>mrp</th>
                                <th>Image</th>
                                <th>mode</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(item => <tr key={item._id} className={item.active ? "bg-green-500" : "bg-red-400"}>
                                    <td>{item.name}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.mrp}</td>
                                    <td><img src={item.images} height={100} width={100} alt="" /></td>
                                    <td>
                                        {
                                            item.active
                                                ? <button
                                                    onClick={e => deActivateProduct(item)}
                                                    className="btn mx-1 btn-outline btn-error">deActivate</button>
                                                : <button
                                                    onClick={e => activateProduct(item)}
                                                    className="btn mx-1 btn-outline btn-success">Activate</button>
                                        }


                                    </td>
                                    <td>
                                        <button className="btn mx-1 btn-outline btn-warning">Edit</button>
                                        <button onClick={e => deleteProduct(item._id)} className="btn mx-1 btn-outline btn-error">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
                <div>
                    <dialog id="my_modal_3" className="modal">
                        <div>
                            <ProductForm />
                        </div>
                    </dialog>
                </div>

            </div>
        </div>

    </>
}


const ProductForm = () => {
    const [addProduct, { isSuccess, isError }] = useAdminAddProductMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            desc: "",
            price: "",
            stock: "",
            mrp: "",
            hero: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            desc: yup.string().required("Enter desc"),
            price: yup.string().required("Enter price"),
            stock: yup.string().required("Enter stock"),
            mrp: yup.string().required("Enter mrp"),
            hero: yup.string().required("Enter images"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            for (const key in values) {
                fd.append(key, values[key])
            }
            addProduct(fd)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product Add Success")
        }
    }, [isSuccess])
    return <>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <h1 className='text-center mt-5'>Add Product</h1>
            <div className="card-body">
                <form method='dialog' onSubmit={formik.handleSubmit}>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                    <input
                        {...formik.getFieldProps("name")}
                        type="text" placeholder="Enter name"
                        className="input input-bordered my-2 w-full" />
                    <input
                        {...formik.getFieldProps("desc")}
                        type="text" placeholder="Enter desc"
                        className="input input-bordered my-2 w-full" />
                    <input
                        {...formik.getFieldProps("price")}
                        type="text" placeholder="Enter price"
                        className="input input-bordered my-2 w-full" />
                    <input
                        {...formik.getFieldProps("stock")}
                        type="text" placeholder="Enter stock"
                        className="input input-bordered my-2 w-full" />
                    <input
                        {...formik.getFieldProps("mrp")}
                        type="text" placeholder="Enter mrp"
                        className="input input-bordered my-2 w-full" />
                    {/* <pre>{JSON.stringify(formik.values.hero)}</pre> */}
                    <input
                        onChange={e => formik.setFieldValue("hero", e.target.files[0])}
                        name='hero'
                        type="file"
                        className="file-input file-input-bordered  my-2 w-full" />
                    <button type='submit' className="btn  w-full btn-primary">Add Product</button>
                </form>
            </div>
        </div>



    </>
}

export default AdminProducts