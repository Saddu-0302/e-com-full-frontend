import React, { useState } from 'react'
import { useAdminGetAllOrderQuery, useUpdateOrderStatusMutation } from '../redux/apis/adminApi'

const AdminOrders = () => {
    const [updateOrderStatus, { isSuccess, isLoading, isError }] = useUpdateOrderStatusMutation()
    const [selectedOrder, setSelectedOrder] = useState()
    const { data } = useAdminGetAllOrderQuery()

    return <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {
            data && <table className='table'>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => <tr key={item._id}>
                            <td>{item.user.name}</td>
                            <td>{item.user.email}</td>
                            <td>
                                {
                                    item.products.map(p => <div
                                        className='flex w-96 bg-gray-700 my-4 gap-4 shadow-xl'>
                                        <img
                                            src={p.product.images}
                                            className='size-40 my-10 object-cover' alt="" />
                                        <div className='card-body flex-1'>
                                            <p>Name : {p.product.name}</p>
                                            <p>Desc : {p.product.desc}</p>
                                            <p>Price : {p.product.price}</p>
                                            <p>mrp : {p.product.mrp}</p>
                                            <p>qty : {p.qty}</p>
                                        </div>
                                    </div>)
                                }
                            </td>
                            <td>{item.status}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedOrder(item)
                                        document.getElementById('editModal').showModal()
                                    }} className="btn btn-primary">Edit</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        }





        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="editModal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    {
                        selectedOrder && <div>
                            {
                                selectedOrder.products.map(item => <div className='flex gap-4'>
                                    <img src={item.product.images} className='size-40' alt="" />
                                    <div>
                                        <p>Name : {item.product.name}</p>
                                        <p>Price : {item.product.price}</p>
                                    </div>
                                </div>)
                            }
                            <select onChange={e =>
                                setSelectedOrder(
                                    { ...selectedOrder, status: e.target.value })} className="select select-bordered w-full my-4">
                                <option disabled selected>Change Status</option>
                                <option disabled>Placed</option>
                                <option value="cancel">Cancel</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button onClick={e => updateOrderStatus(selectedOrder)} className="btn w-full btn-primary">Change Status</button>
                        </div>
                    }
                </form>

            </div>
        </dialog>
    </>
}

export default AdminOrders