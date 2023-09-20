import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars } from '../components';
import { formatPrice } from '../utils/helpers';

const Product = ({ product }) => {
    const { title, price, image } = product.attributes;
    const formatedPrice = formatPrice(price);

    return (
        <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full hover:shadow-xl ease-in-out duration-300 bg-white"
        >
            <figure className="px-2 pt-2 relative">
                <img
                    src={image}
                    alt={title}
                    className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
                <div className="flex">
                    <span className="absolute top-2 right-2 p-1 text-white tracking-wide">
                        <AiOutlineHeart className="w-[30px] h-[30px] hover:text-primary transition-colors duration-300" />
                    </span>
                    <span className="absolute top-2 left-2 badge badge-secondary text-white tracking-wide text-lg">
                        15%
                    </span>
                </div>
            </figure>
            <div className="card-body">
                <div className="flex">
                    <h2 className="card-title capitalize">
                        {title}
                        <div className="badge badge-secondary text-white">
                            NEW
                        </div>
                    </h2>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary text-left">
                        Giá:{formatedPrice}
                    </span>
                    <span className=" text-left line-through">
                        {formatedPrice}
                    </span>
                </div>
                <div className="flex justify-between">
                    <Stars />
                    <div>Đã bán 65</div>
                </div>
            </div>
            <div className="flex justify-between ">
                <button className="btn btn-ghost border-2  hover:bg-secondary hover:text-white">
                    Thêm vào giỏ hàng
                </button>
                <button className="btn btn-ghost">Xem chi tiết</button>
            </div>
        </Link>
    );
};

export default Product;
