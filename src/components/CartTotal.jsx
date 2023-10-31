import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/helpers';
import { FormInput, SubmitButton } from '../components';
const totals = {
    cartTotal: 120000,
    shipping: 1200040,
    tax: 1201000,
    orderTotal: 1202000,
};
const CartTotal = () => {
    const { cartTotal, shipping, tax, orderTotal } = totals;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                {/* DISCOUNT */}
                <div className="form-control">
                    <span className=" text-primary font-bold text-sm pb-2">Mã giảm giá</span>
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* SUBTOTAL */}
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span className="font-bold text-sm">Subtotal</span>
                    <span className="">{formatPrice(cartTotal)}</span>
                </p>
                {/* SHIPPING */}
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span className="font-bold text-sm">Shipping</span>
                    <span className="">{formatPrice(shipping)}</span>
                </p>
                {/* Tax */}
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span className="font-bold text-sm">Tax</span>
                    <span className="">{formatPrice(tax)}</span>
                </p>
                {/* Order Total */}
                <p className="flex justify-between text-sm mt-4 pb-2">
                    <span className="font-bold text-sm">Order Total</span>
                    <span className="">{formatPrice(orderTotal)}</span>
                </p>
            </div>
        </div>
    );
};

export default CartTotal;
