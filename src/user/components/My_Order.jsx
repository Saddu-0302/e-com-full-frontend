import React, { useEffect } from 'react'
import { useLazyUserGetAllOrderQuery, useUserCancelOrderMutation } from '../../redux/apis/userApi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import orderimg from './../../../public/order-img.svg'

const My_Order = () => {

    const { user } = useSelector(state => state.auth)
    const [getOrders, { data, isSuccess, isLoading }] = useLazyUserGetAllOrderQuery()
    const [cancelOrder, { isSuccess: cancelSuccess }] = useUserCancelOrderMutation()

    useEffect(() => {
        getOrders(user._id)
    }, [])
    useEffect(() => {
        if (cancelSuccess) {
            toast.success("Order Cancel")
        }
    }, [cancelSuccess])

    return <>
        <div className='mt-20 m-20'>
            <h1 className='text-2xl ml-10 my-5 text-gray-500'>My Order</h1>
            {
                data && data.length
                    ? <div>
                        {
                            data.map(item => <div>
                                <table className='table table-border'>
                                    <tbody>
                                        {
                                            item.products.map(p => <tr className='' key={item._id}>
                                                <td>
                                                    <img src={p.product.images} className='text-5xl' height={400} width={100} alt="" />
                                                </td>
                                                <td >
                                                    <div className=''>
                                                        <div className='flex mx-20'>
                                                            <div className=''>
                                                                <p className='font-bold text-lg '>{p.product.name}</p>
                                                                <div>
                                                                    <p className='text-sm opacity-50'>{p.product.desc}</p>
                                                                </div>

                                                            </div>
                                                            <div className=' ml-20'>
                                                                <p className='text-lg font-bold'>
                                                                    ₹{p.product.price}</p>
                                                            </div>
                                                            <div className='mx-20 text-center'>
                                                                <p>Name : {item.firstName} {item.lastName}</p>
                                                                <p>
                                                                    Address : {item.address} {item.city} {item.state} {item.postalCode}
                                                                </p>
                                                                <p>
                                                                    Mobile No: {item.mobile}
                                                                </p>
                                                                <p> Payment Method: {item.paymentMethod}</p>
                                                            </div>
                                                            <div className='flex  my-5'>
                                                                {
                                                                    item.status === "placed" && <button onClick={e => cancelOrder(item._id)} className="btn btn-outline btn-warning w-full btn-sm">Cancel Order</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>)
                        }
                    </div>
                    : <div className='flex justify-center items-center h-full'>
                        <div className="card  flex justify-center items-center card-compact w-96 bg-base-200 shadow-xl m-10">
                            <div className="card-body">
                                <div>
                                    <img src={orderimg} className='w-52' alt="" />
                                    <Link to="/" className="btn btn-outline my-3 w-full btn-sm">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>



    </>
}

export default My_Order