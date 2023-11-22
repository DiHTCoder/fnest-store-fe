import React from 'react';
import banner from '../assets/product/purpose.jpg';
const Purpose = () => {
    return (
        <div className="container bg-white p-4 shadow-xl md:p-10  lg:max-w-screen-xl lg:rounded-3xl lg:p-14">
            <div className="flex flex-col-reverse justify-center md:flex-row">
                <div className="relative h-[372px] w-full md:w-1/2 lg:h-[504px]">
                    <div className="overflow-hidden rounded-3xl w-full h-full transition-transform duration-300 transform hover:scale-105">
                        <img src={banner} alt="hoa" className="object-fit w-full h-full" />
                    </div>
                </div>
                <div className="flex w-full flex-col md:w-1/2 justify-center">
                    <h2 className="my-2 bg-gradient-to-b from-pink-600 to-blue-500 bg-clip-text text-center text-3xl font-extrabold leading-normal text-transparent md:my-5 lg:my-7 lg:text-6xl">
                        Nội thất đẹp, cuộc sống hoàn hảo
                    </h2>
                    <p className="mb-8 text-center text-slate-700 md:mb-0 md:pl-5 md:text-right lg:text-xl">
                        Hãy khám phá không gian sống mới, hãy tạo nên câu chuyện riêng của bạn với những chiếc nội thất
                        tinh tế từ chúng tôi. Chúng tôi tin rằng, mỗi ngôi nhà đều là một tác phẩm nghệ thuật, và chúng
                        tôi là đối tác lý tưởng để bạn bắt đầu hành trình sáng tạo của mình. Chào mừng bạn đến với thế
                        giới đẳng cấp của nội thất, nơi mà phong cách gặp gỡ sự thoải mái.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Purpose;
