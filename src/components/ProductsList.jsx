import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { Product, Stars } from '../components';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../utils/helpers';
import { addItemToCart, getTotals } from '../features/cart/cartSlice';
import { addItemToFavourite } from '../features/favourite/favouriteSlice';

const ProductsList = ({ products }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
        dispatch(getTotals());
    };
    const handleAddToFavourite = (product) => {
        dispatch(addItemToFavourite(product)); // Thêm sản phẩm vào giỏ hàng
    };

    return (
        <div className="my-12 grid gap-y-4">
            {products.content.map((product) => {
                return (
                    <div
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="relative p-8 rounded-lg flex flex-col sm:flex-row gap-y-2 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="ml-0 sm:ml-16 max-w-[700px]">
                            <div className="flex">
                                <h3 className="capitalize font-medium text-lg">{product.name}</h3>
                                <Stars />
                            </div>
                            <div>
                                <button
                                    className="absolute top-2 right-2 p-1 text-white tracking-wide group"
                                    onClick={() => {
                                        handleAddToFavourite(product);
                                    }}
                                >
                                    <AiOutlineHeart className="w-[30px] h-[30px] text-info transition duration-300 group-hover:text-red-500" />
                                </button>
                            </div>
                            <h4 className="capitalize my-2 text-md text-neutral-content">
                                <span className="font-bold">Chất liệu: </span>
                                {product.material}
                            </h4>
                            <h4 className="capitalize text-md text-neutral-content">
                                <span className="font-bold">Kích thước: </span>
                                {product.size}
                            </h4>
                            <h4 className="capitalize text-md text-neutral-content">
                                <span className="font-bold">Kho: </span>
                                {product.inStock}
                            </h4>
                        </div>

                        <div className="ml-0 sm:ml-auto text-lg">
                            {' '}
                            <p className="font-medium my-4 line-through">{formatPrice(product.price)}</p>
                            <p className="font-medium my-4 text-secondary">Giá:{formatPrice(product.salePrice)}</p>
                            <button
                                className="btn btn-outline btn-info"
                                onClick={() => {
                                    handleAddToCart(product);
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductsList;
