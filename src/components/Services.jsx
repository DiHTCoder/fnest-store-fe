import React from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { RiExchangeLine } from 'react-icons/ri';
import { PiShieldCheck } from 'react-icons/pi';
import { TbSettingsCheck } from 'react-icons/tb';

const Services = () => {
    return (
        <div className="grid grid-cols-4 space-x-2 justify-center items-center mt-5">
            <div className="rounded-xl transition delay-100 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <BsCartCheck className="w-[100px] h-[100px]" />
                <h2 className="text-xl py-4">Giao hàng và lắp đặt</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <RiExchangeLine className="w-[100px] h-[100px]" />
                <h2 className="text-xl py-4">Đổi trả 1-1</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <PiShieldCheck className="w-[100px] h-[100px]" />
                <h2 className="text-xl py-4">Bảo hành 2 năm</h2>
                <h3>Miễn phí</h3>
            </div>
            <div className="rounded-md transition delay-150 hover:-translate-y-1 hover:scale-110 duration-600 border-[2px] w-full h-[250px] bg-white shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2 flex flex-col items-center justify-center">
                <TbSettingsCheck className="w-[100px] h-[100px]" />
                <h2 className="text-xl py-4">Tư vấn thiết kế & lắp đặt</h2>
                <h3>Miễn phí</h3>
            </div>
        </div>
    );
};

export default Services;
