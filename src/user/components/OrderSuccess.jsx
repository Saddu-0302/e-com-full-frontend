import Lottie from 'lottie-react'
import Success from "./../../../public/success.json"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const OrderSuccess = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let id = setTimeout(() => {
            navigate("/order")
        }, 5000);
        return () => clearTimeout(id)
    }, [])
    return <>
        <Lottie
            animationData={Success}
            autoPlay={true}
            loop={true}
            style={{
                height: 500
            }} />
    </>
}

export default OrderSuccess