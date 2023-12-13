import React from 'react';
import { NavLink } from 'react-router-dom';
import table from '../assets/images/table.png';

const Stylist = () => {
    return (
        <section aria-labelledby="home" class="relative">
            <div class="flex flex-wrap-reverse gap-8 justify-center">
                <div class="flex gap-6 flex-wrap flex-col items-start lg:justify-center">
                    <div class="flex flex-wrap flex-col items-start gap-2">
                        <h2 class="text-4xl font-bold">Tự do sáng tạo!</h2>
                        <p class="max-w-md lg:text-xl text-base">
                            Sứ mệnh của chúng tôi là tạo ra không gian sống đẹp và thoải mái nhất cho bạn. Chúng tôi cam
                            kết cung cấp đồ nội thất chất lượng cao, tinh tế và phong cách.
                        </p>
                    </div>
                    <NavLink
                        to="/posts"
                        class="btn btn-info text-white
            "
                    >
                        KHÁM PHÁ NGAY
                    </NavLink>
                </div>
                <img src={table} alt="Table" />
            </div>
            <div
                class="
            absolute
            -bottom-6
            -right-32
            -z-10
            aspect-square
            md:border-8
            border-amber-400
            rounded-full
            md:w-64
            lg:w-96       
        "
            ></div>
            <div
                class="
            bg-info
            h-24
            xl:h-48
            -mx-8 
            mt-12
            lg:mt-0
            lg:absolute
            lg:w-full
            -bottom-8
            -z-10
        "
            ></div>
        </section>
    );
};

export default Stylist;
