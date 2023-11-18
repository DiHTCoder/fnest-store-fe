import React from 'react';
import banner2 from '../assets/banner/banner-2.jpg';
import { Breadcrumb } from '../components';

const Bannner = ({ name, image }) => {
    return (
        <div className="carousel w-full h-[440px]">
            <div className="carousel-item relative w-full flex items-center justify-center">
                <div className="absolute inset-0 brightness-75">
                    <img src={banner2} className="w-full h-full object-cover" alt="Banner" draggable="false" />
                </div>

                <div className="z-10 text-white text-center">
                    <h2 className="text-4xl font-extrabold ">Sản phẩm</h2>
                    <Breadcrumb url="products" page="Sản phẩm" />
                </div>
            </div>
        </div>
    );
};

export default Bannner;
