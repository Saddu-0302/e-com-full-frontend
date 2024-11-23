import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Products from '../components/Products'
import Footer from '../components/Footer'
import SwiperPage from '../components/Swiper'


const Home = () => {

    return <>
        {/* <Navbar /> */}
        <Carousel />
        <SwiperPage />
        <Products />
        <Footer />

    </>
}

export default Home