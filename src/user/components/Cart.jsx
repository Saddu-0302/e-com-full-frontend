import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../redux/slices/userSlice'
import emptycart from "./../../../public/empty-cart.png";
const Cart = () => {

    const { cart } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <>
        {
            cart.length > 0
                ? <div className=''>
                    <div className='grid grid-cols-6 gap-10 mt-20'>
                        {
                            cart && <table className='text-black dark:text-white table m-10 border-black'>
                                <thead>
                                    <tr>
                                        <th className='text-2xl'>Shopping Cart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map(item => <tr className='' key={item._id}>
                                            <td>
                                                <img src={item.images} className='text-5xl' height={400} width={300} alt="" />
                                            </td>
                                            <td >
                                                <div className=''>
                                                    <div className='flex mx-20'>
                                                        <div className=''>
                                                            <p className='font-bold text-lg '>{item.name}</p>
                                                            <div>
                                                                <p className='text-sm opacity-50'>{item.desc}</p>
                                                            </div>
                                                            <div>
                                                                <p className='text-green-400 text-sm'>In Stock</p>
                                                            </div>
                                                            <div className='flex my-5'>
                                                                <button onClick={e => dispatch(removeFromCart(item._id))}>Delete </button>
                                                                <p className='mx-2 opacity-50'>|</p>

                                                                <button onClick={e => navigate("/")}>ShopMore</button>
                                                                <p className='mx-2 opacity-50'>|</p>
                                                                {/* <select
                                                                    // onChange={handleChange}
                                                                    // value={qty}
                                                                    className="form-select">
                                                                    {[...Array(10).keys()].map(num => (
                                                                        <option key={num} value={num + 1}>
                                                                            {num + 1}
                                                                        </option>
                                                                    ))}
                                                                </select> */}

                                                            </div>
                                                        </div>
                                                        <div className=' ml-20'>
                                                            <p className='text-lg font-bold'>₹{item.price}</p>
                                                            <div className='flex opacity-50'>
                                                                <p className=''>M.R.P:</p>
                                                                <p className='line-through'>₹{item.mrp}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className='flex justify-end mt-2'>
                        <button
                            onClick={e => {
                                navigate("/payment")
                            }
                            }
                            className="btn mx-5 btn-primary">Continue</button>
                    </div>
                </div >
                : <div className='flex justify-center items-center h-full'>
                    <div className="card  flex justify-center items-center card-compact w-96 bg-base-200 shadow-xl mt-52 m-10">
                        <div className="card-body">
                            <div>
                                <img src={emptycart} className='w-52' alt="" />
                                <Link to="/" className="btn btn-outline my-3 w-full btn-sm">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </>
}

export default Cart

