import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { emptyCart } from '../../redux/slices/userSlice'
import { useUserPlaceOrderMutation } from '../../redux/apis/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Payment = () => {
    const navigate = useNavigate()
    const [placeOrder, { isSuccess, isLoading, isError }] = useUserPlaceOrderMutation()
    const { user } = useSelector(state => state.auth)
    const { cart } = useSelector(state => state.user)
    const [paymentData, setPaymentData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        postalCode: 0,
        country: "",
        state: "",
        paymentMethod: "",
        address: "",
        mobile: 0
    })
    const dispatch = useDispatch()

    console.log(paymentData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setPaymentData({ ...paymentData, [name]: value })
        // setPaymentData({ ...paymentData, [name]: type === 'checkbox' ? checked : value })
    }

    const handlePlaceOrder = e => {
        const obj = {
            user: user._id,
            products: cart.map(item => {
                return { product: item._id, qty: item.qty }
            })
        }
        placeOrder({
            ...obj,
            firstName: paymentData.firstName,
            lastName: paymentData.lastName,
            city: paymentData.city,
            postalCode: paymentData.postalCode,
            country: paymentData.country,
            state: paymentData.state,
            paymentMethod: paymentData.paymentMethod,
            address: paymentData.address,
            mobile: paymentData.mobile
        })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Place Success")
            navigate("/success")
            dispatch(emptyCart())
        }
    }, [isSuccess])
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])


    const totalPrice = cart.reduce((sum, item) => (sum + item.price), 0)


    return <>
        <div className='mt-16'>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
                <div
                    className="bg-white p-8 rounded-lg shadow-md max-w-6xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="space-y-4">
                            {/* Shipping Information */}
                            <h2 className="text-2xl font-bold text-slate-400 mb-4">Shipping Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    placeholder="First name"
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <input
                                type="text"
                                name="address"
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    name="postalCode"
                                    onChange={handleChange}
                                    placeholder="Postal code"
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    name="country"
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded"
                                >
                                    <option disabled selected>Select Country</option>
                                    <option value="India">India</option>
                                    <option value="United">United States</option>
                                    <option value="Canada">Canada</option>
                                    {/* Add more countries as needed */}
                                </select>
                                <input
                                    type="text"
                                    name="state"
                                    onChange={handleChange}
                                    placeholder="State / Province"
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <input
                                type="number"
                                name="mobile"
                                onChange={handleChange}
                                placeholder="+91 **********"
                                className="w-full p-2 border border-gray-300 rounded"
                            />


                        </div>
                        {/* Order Summary */}
                        <div className="space-y-4 lg:order-2 order-2 md:order-3">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Product Name</span>
                                    <span>
                                        {
                                            cart.map(item => <h1 className=''>{item.name}</h1>
                                            )
                                        }
                                    </span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span>Basic Tee (Large, Sienna)</span>
                                    <span>$32.00</span>
                                </div> */}
                            </div>
                            <hr className="my-4" />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹ 40</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes</span>
                                    <span>₹ 40</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{totalPrice + 80}</span>
                                </div>
                                <hr className="my-4" />
                                <div className=" font-bold">
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="btn w-full my-3 btn-primary">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*  Payment Method*/}
                        <div className="mt-6 space-y-4 lg:order-3 md:order-2">
                            <h2 className="text-2xl font-bold mb-4">Payment</h2>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="Credit Cart"
                                    checked={paymentData.paymentMethod === "Credit Cart"}
                                    name="paymentMethod"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Credit Card</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="PayPal"
                                    checked={paymentData.paymentMethod === "PayPal"}
                                    name="paymentMethod"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>PayPal</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="AfterPay"
                                    checked={paymentData.paymentMethod === "AfterPay"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Afterpay</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash On Delivery"
                                    checked={paymentData.paymentMethod === 'Cash On Delivery'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Cash on delivery / Pay on delivery</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Payment