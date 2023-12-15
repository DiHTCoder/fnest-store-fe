import React from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { RiExchangeLine } from 'react-icons/ri';
import { PiShieldCheck } from 'react-icons/pi';
import { TbSettingsCheck } from 'react-icons/tb';

const Services = () => {
    return (
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 justify-center items-center my-5 lg:text-xl text-sm">
            <div className="rounded-xl transition delay-100 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center ">
                <BsCartCheck className="md:w-[100px] md:h-[100px] h-[50px] w-[50px]" />
                <h2 className="lg:text-xl py-4  text-center">Giao hàng và lắp đặt</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <RiExchangeLine className="md:w-[100px] md:h-[100px] h-[50px] w-[50px]" />
                <h2 className="lg:text-xl py-4 text-center">Đổi trả 1-1</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <PiShieldCheck className="md:w-[100px] md:h-[100px] h-[50px] w-[50px]" />
                <h2 className="lg:text-xl py-4">Bảo hành 2 năm</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <TbSettingsCheck className="md:w-[100px] md:h-[100px] h-[50px] w-[50px]" />
                <h2 className="lg:text-xl py-4 text-center">Tư vấn thiết kế & lắp đặt</h2>
                <h3>Miễn phí</h3>
            </div>
        </div>
    );
};

export default Services;
