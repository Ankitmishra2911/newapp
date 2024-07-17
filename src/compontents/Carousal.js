import React, { useRef, useState,useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Carousal.css';



// import required modules
import { Pagination } from 'swiper/modules';
import { FaCartShopping } from 'react-icons/fa6';

export default function Carousal(props) {

  return (
    <div className='my-16 px-4 lg;px-24'>
      <h2 className='text-5x1 text-center font-bold text-white my-5'>Best Seller Items</h2>
      <div>   
  
    <>
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
      >
        
        {
           props.items.map(data=>
            <SwiperSlide key={data.itemid}>
              <Link to={`/category/${data.itemid}`}>
                <div>
                  <img src={data.imgsrc} alt='' style={{objectFit:"fill",height:"200px"}}/>
                </div>
                <div>
                <h3>{data.itemname}</h3>
                </div>
                <div>
                  <p>₹{data.itemprice}</p>
                </div>

                
                </Link></SwiperSlide>
           )
         }
      </Swiper>
    </>
    </div>   
    </div>
  );
}
