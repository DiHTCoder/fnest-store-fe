import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { Stars } from '.';
import { formatPrice } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { addItemToCart, getTotals } from '../features/cart/cartSlice';
import { addItemToFavourite } from '../features/favourite/favouriteSlice';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addItemToCart(product));
        dispatch(getTotals());
    };
    const handleAddToFavourite = (e) => {
        e.preventDefault();
        dispatch(addItemToFavourite(product)); // Thêm sản phẩm vào giỏ hàng
    };

    return (
        <div key={product.id} className="card w-full hover:shadow-xl ease-in-out duration-300 bg-white">
            <Link to={`/products/${product.id}`}>
                <figure className="px-2 pt-2 relative">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="rounded-xl h-64 md:h-48 w-full object-cover"
                    />
                </figure>
                <div className="flex">
                    <button
                        className="absolute btn btn-circle bg-white top-2 right-2 p-1 text-white tracking-wide group"
                        onClick={(e) => {
                            handleAddToFavourite(e);
                        }}
                    >
                        <AiOutlineHeart className="w-[30px] h-[30px] text-info transition duration-300 group-hover:text-red-500" />
                    </button>
                    {product.featured && (
                        <span className="absolute top-2 left-2 badge badge-error text-white tracking-wide text-lg">
                            NEW
                        </span>
                    )}
                </div>
                <div className="card-body">
                    <div className="min-h-[84px]">
                        <h2 className="card-title capitalize ">{product.name}</h2>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-secondary text-left">{formatPrice(product.price)}</span>
                        <span className=" text-left line-through">{formatPrice(product.salePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <Stars />
                        <div>SL: {product.inStock}</div>
                    </div>
                </div>
            </Link>
            <div
                onClick={() => {
                    handleAddToCart();
                }}
                class="flex items-center justify-center rounded-md bg-info px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                <IoMdAddCircleOutline className="w-6 h-6" />
                Thêm vào giỏ hàng
            </div>
        </div>
    );
};

export default Product;
