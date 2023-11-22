import React from 'react';
import { Breadcrumb } from '../components';
const Bannner = ({ name, image, url }) => {
    return (
        <div className="carousel w-full h-[440px]">
            <div className="carousel-item relative w-full flex items-center justify-center">
                <div className="absolute inset-0 brightness-75">
                    <img src={image} className="w-full h-full object-cover" alt="Banner" draggable="false" />
                </div>

                <div className="z-10 text-white text-center">
                    <h2 className="text-4xl font-extrabold ">{name}</h2>
                    <Breadcrumb url={url} page={name} />
                </div>
            </div>
        </div>
    );
};

export default Bannner;
