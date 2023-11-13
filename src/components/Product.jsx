import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars } from '.';
import { formatPrice } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const formatedPrice = formatPrice(product.price);
    const handleAddToCart = () => {
        dispatch(addItemToCart(product)); // Thêm sản phẩm vào giỏ hàng
    };

    return (
        <div
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full hover:shadow-xl ease-in-out duration-300 bg-white"
        >
            <figure className="px-2 pt-2 relative">
                <img
                    src={product.thumbnail}
                    alt={product.name}
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
                    <h2 className="card-title capitalize ">{product.name}</h2>
                    <div className="badge badge-secondary text-white">NEW</div>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary text-left">Giá:{formatedPrice}</span>
                    <span className=" text-left line-through">{formatedPrice}</span>
                </div>
                <div className="flex justify-between">
                    <Stars />
                    <div>Còn lại: {product.inStock}</div>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    className="btn btn-outline btn-info"
                    onClick={() => {
                        handleAddToCart();
                    }}
                >
                    Thêm vào giỏ hàng
                </button>
                <button className="btn">Xem thêm</button>
            </div>
        </div>
    );
};

export default Product;
