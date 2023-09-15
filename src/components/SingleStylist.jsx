import React, { useState } from 'react';
const SingleStylist = ({ id, image, info, name, price }) => {
    const [readMore, setReadMore] = useState(false);
    return (
        <article className="bg-white border rounded-sm shadow-sm hover:shadow-xl ease-in-out duration-300 relative mb-2">
            <img
                src={image}
                alt={name}
                className="h-[20rem] rounded-tr-sm rounded-tl-sm w-full"
            />
            <span className="absolute  top-0 right-0 p-1 text-white tracking-wide bg-primary rounded-tr-sm">
                ${price}
            </span>
            <div className="leading-6 mb-1 font-think tracking-wide px-5">
                <h5 className="text-center mb-1 font-semibold leading-6 text-xl">
                    {name}
                </h5>

                <p className="tracking-wide mb-2">
                    {readMore ? info : `${info.substring(0, 200)}...`}
                    <button
                        className=" text-primary uppercase cursor-pointer"
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? 'show less' : '  read more'}
                    </button>
                </p>
            </div>
        </article>
    );
};

export default SingleStylist;
