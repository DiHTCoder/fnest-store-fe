import React from 'react';
import { formatPrice, generateAmountOptions } from '../utils/helpers';
const cartItems = [
    {
        cartID: 1,
        title: 'Sản phẩm mẫu 1',
        price: 29.99,
        image: 'https://gowell.vn/wp-content/uploads/2019/03/ghe-chan-quy-luzi-1.jpg',
        amount: 2,
        company: 'Công ty ABC',
        productColor: 'grey',
    },
    {
        cartID: 2,
        title: 'Sản phẩm mẫu 2',
        price: 29.99,
        image: 'https://gowell.vn/wp-content/uploads/2019/05/ghe-sofa-Comi-1a.png',
        amount: 2,
        company: 'Công ty ABC',
        productColor: 'green',
    },
];

const CartItem = () => {
    const removeItemFromTheCart = () => {};
    const handleAmount = (e) => {};

    return (
        <div>
            {cartItems.map((cartItem) => {
                const { cartID, title, price, image, amount, company, productColor } = cartItem;

                return (
                    <article
                        key={cartID}
                        className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
                    >
                        {/* IMAGE */}
                        <img src={image} alt={title} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
                        {/* INFO */}
                        <div className="sm:ml-16 sm:w-48">
                            {/* TITLE */}
                            <h3 className="capitalize font-medium">{title}</h3>
                            {/* COMPANY */}
                            <h4 className="mt-2 capitalize text-sm text-neutral-content">{company}</h4>
                            {/* COLOR */}
                            <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                                color :
                                <span className="badge badge-sm" style={{ backgroundColor: productColor }}></span>
                            </p>
                        </div>
                        <div className="sm:ml-12">
                            {/* AMOUNT */}
                            <div className="form-control max-w-xs">
                                <label htmlFor="amount" className="label p-0">
                                    <span className="label-text">Số lượng</span>
                                </label>
                                <select
                                    name="amount"
                                    id="amount"
                                    className="mt-2 select select-base select-bordered select-xs"
                                    value={amount}
                                    onChange={handleAmount}
                                >
                                    {generateAmountOptions(amount + 5)}
                                </select>
                            </div>
                            {/* REMOVE */}
                            <button
                                className="mt-2 link link-primary link-hover text-sm"
                                onClick={removeItemFromTheCart}
                            >
                                Xóa sản phẩm
                            </button>
                        </div>

                        {/* PRICE */}
                        <p className="font-xl sm:ml-auto">{formatPrice(price)}</p>
                    </article>
                );
            })}
        </div>
    );
};

export default CartItem;
