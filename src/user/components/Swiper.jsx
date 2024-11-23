import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

const SwiperPage = () => {
    return <>
        <div>
            <div>
                <h1 className='text-2xl font-bold text-slate-500 pt-5 ml-10'>Medal Worthy Brands To Bag</h1>
            </div>
            <div className=' m-10' id="carouselExampleCaptions">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    id='swiper-pagination swiper-pagination-clickable'
                >
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none" data-bs-target="#swiper-pagination swiper-pagination-clickable" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none" data-bs-target="#swiper-pagination swiper-pagination-clickable" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>

                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/8/3/d6529cc8-ff03-4d85-88b7-5358a1d5a46b1691057399814-image_png1830835492.png" className='w-full h-auto' alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/8/4/b504644b-f446-48c9-b928-36f1958bd19a1691142484406-image_png_292913761.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/8/4/ccebd3fc-3628-4eb5-9604-5487049c2cff1691142886405-image_png356438875.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2023/8/4/921e38ac-f903-4701-a419-df42b9448ef51691142513445-image_png1803300271.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/8/4/6ddcd2e5-20c6-4672-9b02-7d2117550f641691142512854-image_png242033865.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2023/8/3/a06120fd-caa3-4dac-93c3-3d4d574f8d7c1691087170219-image_png_116457033.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/8/4/7abcde7c-18e5-44c5-9cd9-c1490daa842a1691142533559-image_png2078004791.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/7/29/00e27983-d373-4d86-9f25-3e46a18ec12a1690609817622-Top_casual_Styles-_Levi-s-_Tommy_Min_40.png" alt="" className="w-full h-auto" /></SwiperSlide>
                    <SwiperSlide><img src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2023/8/4/921e38ac-f903-4701-a419-df42b9448ef51691142513445-image_png1803300271.png" alt="" className="w-full h-auto" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    </>
}

export default SwiperPage