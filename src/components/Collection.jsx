import React from 'react';
import banner1 from '../assets/product/banner1.jpg';
import banner2 from '../assets/product/banner2.jpg';
import banner3 from '../assets/product/banner3.jpg';
import banner4 from '../assets/product/banner4.jpg';
import banner5 from '../assets/product/banner5.jpg';
import { Link } from 'react-router-dom';

const Collection = () => {
    return (
        <div className="container relative mx-auto flex flex-col rounded-3xl my-10 lg:max-w-screen-xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-0 w-full overflow-hidden rounded-3xl pb-[100%] shadow-lg">
                        <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity ease-linear hover:opacity-100">
                            <span className="text-center font-bold text-white xl:text-2xl">Maxine</span>
                        </div>
                        <img src={banner2} alt="fmp" fill className="object-cover object-top hover:-m-10" />
                    </div>
                    <div className="relative h-0 w-full overflow-hidden rounded-3xl pb-[100%] shadow-lg">
                        <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity ease-linear hover:opacity-100">
                            <span className="text-center font-bold text-white xl:text-2xl">Dubai</span>
                        </div>
                        <img src={banner3} alt="fmp" fill className="object-cover object-top" />
                    </div>
                    <div className="relative h-0 w-full overflow-hidden rounded-3xl pb-[100%] shadow-lg">
                        <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity ease-linear hover:opacity-100">
                            <span className="text-center font-bold text-white xl:text-2xl">Victoria</span>
                        </div>
                        <img src={banner4} alt="fmp" fill className="object-cover object-top" />
                    </div>
                    <div className="relative h-0 w-full overflow-hidden rounded-3xl pb-[100%] shadow-lg">
                        <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity ease-linear hover:opacity-100">
                            <span className="text-center font-bold text-white xl:text-2xl">Bridge</span>
                        </div>
                        <img src={banner5} alt="fmp" fill className="object-cover object-top" />
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-black/40 transition-opacity ease-linear hover:opacity-100">
                        <h3 className="mb-4 text-center text-3xl font-extrabold text-white lg:text-5xl">
                            Sản phẩm <br /> đa dạng
                        </h3>
                        <Link to="products" className="font-bold text-white underline lg:text-2xl">
                            Xem tất cả
                        </Link>
                    </div>
                    <img src={banner1} alt="fmp" fill className="object-fill" />
                </div>
            </div>
        </div>
    );
};

export default Collection;
