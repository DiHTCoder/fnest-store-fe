import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const SingleStylist = ({ id, title, description, banners }) => {
    const [readMore, setReadMore] = useState(false);
    // onClick={() => setReadMore(!readMore)}
    return (
        <article className="bg-white border rounded-sm shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2">
            <img
                src={banners[0]}
                alt="new"
                className="lg:h-[20rem] md:h-[16rem] sm:h-[14rem] rounded-tr-sm rounded-tl-sm w-full"
            />
            <span className="absolute  top-0 right-0 p-1 text-white tracking-wide bg-primary rounded-tr-sm">News</span>
            <div className="leading-6 m-2 font-think tracking-wide px-5">
                <h5 className="text-center m-2  font-semibold leading-6 lg:text-lg text-base">{title}</h5>
                <p className="tracking-wide mb-2 text-justify lg:text-base text-sm">
                    {readMore ? description : `${description.substring(0, 200)}[...]`}
                    <NavLink to={`/posts/${id}`} className=" text-primary uppercase cursor-pointer">
                        {readMore ? 'Thu gọn' : 'Xem thêm'}
                    </NavLink>
                </p>
            </div>
        </article>
    );
};

export default SingleStylist;
