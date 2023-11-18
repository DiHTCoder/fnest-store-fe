import React from 'react';
import { Link } from 'react-router-dom';
import { Product, Stars } from '../components';
const ProductsList = ({ products }) => {
    return (
        <div className="mt-12 grid gap-y-8">
            {products.content.map((product) => {
                return (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="ml-0 sm:ml-16">
                            <div className="flex">
                                <h3 className="capitalize font-medium text-lg">{product.name}</h3>
                                <Stars />
                            </div>

                            <h4 className="capitalize my-2 text-md text-neutral-content">{product.description}</h4>
                            <h4 className="capitalize text-md text-neutral-content">Kích thước: {product.size}</h4>
                            <h4 className="capitalize text-md text-neutral-content">Số lượng còn: {product.inStock}</h4>
                        </div>

                        <div className="ml-0 sm:ml-auto text-lg">
                            {' '}
                            <p className="font-medium my-4 line-through">{product.salePrice - 2000}</p>
                            <p className="font-medium my-4 text-secondary">Giá:{product.salePrice}</p>
                            <button
                                className="btn btn-outline btn-info"
                                onClick={() => {
                                    handleAddToCart();
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductsList;
