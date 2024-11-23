import { useDispatch, useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../../redux/apis/publicApi'
import { addToCart } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'


const Products = ({ item }) => {
    const { data, isSuccess, isLoading } = useGetAllProductsQuery()
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.user)
    const navigate = useNavigate()

    return <>
        <div>
            <h1 className='text-2xl font-bold text-slate-500 pt-5 ml-10'>Best Seller</h1>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div>
                <div>
                    {
                        isLoading
                            ? <div className='text-center'>
                                <span className="loading  loading-ring  w-20"></span>
                            </div>
                            : <div
                                className='
                                grid justify-between mx-8  lg:ml-12 
                                lg:grid-cols-4 
                                md:grid-cols-3 
                                grid-cols-1'>
                                {
                                    data.map(item => <div key={item._id} className="card my-5 card-compact w-52 md:ml-12 ml-10 lg:ml-7 lg:w-52 bg-base-200 shadow-xl hover:shadow-xl hover:transform hover:scale-105 duration-300">
                                        <figure><img src={item.images} alt="" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{item.name}</h2>
                                            <p>{item.desc}</p>
                                            <div className='flex justify-between'>
                                                <h1>Price :</h1>
                                                <h1>{item.price}</h1>
                                            </div>
                                            <div className='flex justify-between'>
                                                <h1>Mrp :</h1>
                                                <h1 className='line-through'>{item.mrp}</h1>
                                            </div>
                                            <div className="card-actions ">
                                                <button
                                                    onClick={e => {
                                                        dispatch(addToCart({ ...item }))
                                                        navigate("/cart")
                                                    }}
                                                    className="btn w-full btn-sm btn-primary">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </>
}

export default Products