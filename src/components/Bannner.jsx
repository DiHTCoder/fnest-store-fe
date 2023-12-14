import React from 'react';
import { Breadcrumb } from '../components';

const Banner = ({ name, image, url }) => {
    return (
        <div className="carousel w-full md:h-[450px] h-[250px] relative">
            <div className="carousel-item relative w-full flex items-center justify-center">
                <div className="absolute inset-0 brightness-75">
                    <img src={image} className="w-full h-full object-cover" alt="Banner" draggable="false" />
                </div>

                <div className="z-10 text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="lg:text-4xl md:text-2xl sm:text-base font-extrabold">{name}</h2>
                    <Breadcrumb url={url} page={name} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
