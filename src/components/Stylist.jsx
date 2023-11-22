import React from 'react';

import table from '../assets/images/table.png';


const Stylist = () => {
   
    return (

        <section aria-labelledby="home" class="relative">
            <div class="flex flex-wrap-reverse gap-8 justify-center">
                <div class="flex gap-6 flex-wrap flex-col items-start lg:justify-center">
                    <div class="flex flex-wrap flex-col items-start gap-2">
                        <h2 class="text-4xl font-bold">Tự do sáng tạo!</h2>
                        <p class="max-w-md text-xl">
                            Sứ mệnh của chúng tôi là tạo ra không gian sống đẹp và thoải mái nhất cho bạn. Chúng tôi cam
                            kết cung cấp đồ nội thất chất lượng cao, tinh tế và phong cách.
                        </p>
                    </div>
                    <a
                        href="#"
                        class="
                py-2
                px-6
                bg-info
                text-white
                dark:text-neutral-900
                flex
                gap-2
                shadow-xl
                hover:shadow-none
                transition-shadow
                focus:outline-none
                focus-visible:ring-4
                ring-neutral-900
                rounded-md
                ring-offset-4
                ring-offset-white
                dark:ring-amber-400
                dark:ring-offset-neutral-800
                text-xl
                
            "
                    >
                        KHÁM PHÁ NGAY
                    </a>
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
            xl:max-w-lg
        "
            ></div>
            <div
                class="
            bg-teal-900
            h-24
            xl:h-48
            -mx-8 
            mt-12
            xl:mt-0
            xl:absolute
            w-full
            -bottom-8
            -z-10
        "
            ></div>
        </section>
    );
};

export default Stylist;
