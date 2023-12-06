import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, generateAmountOptions } from '../utils/helpers';
import { CiCircleRemove } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { removeFromCart, decreaseCart, addItemToCart } from '../features/cart/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const removeItemFromTheCart = (item) => {
        dispatch(removeFromCart(item));
    };
    const handleDecrease = (item) => {
        dispatch(decreaseCart(item));
    };
    const handleIncrease = (item) => {
        dispatch(addItemToCart(item));
    };

    return (
        <div className="flex space-x-3 w-full mb-10 border-b border-base-300 pb-6 last:border-b-0">
            <img src={item.thumbnail} alt={item.name} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                    <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <p className="font-bold">Chất liệu:</p>
                            <p>{item.material}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <p className="font-bold">Kích thước:</p>
                            <p className="text-sm">{item.size}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 flex-col-reverse">
                        <div className="text-2xl text-secondary font-semibold">
                            {formatPrice(item.price * item.cartQuantity)}
                        </div>
                        <div className="text-sm line-through">Giá: {formatPrice(item.price)}</div>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="sm:ml-12">
                        {/* AMOUNT */}
                        <div class="flex items-center border-gray-100">
                            <button
                                class="btn btn-ghost"
                                onClick={() => {
                                    handleDecrease(item);
                                }}
                            >
                                -
                            </button>
                            <input
                                class="h-10 w-10 border bg-white text-center text-xs outline-none rounded-lg"
                                type="text"
                                value={item.cartQuantity}
                                min="1"
                                inputmode="decimal"
                            />
                            <button
                                class="btn btn-ghost"
                                onClick={() => {
                                    handleIncrease(item);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-ghost" onClick={() => removeItemFromTheCart(item)}>
                        Xóa
                        <CiCircleRemove className="w-[30px] h-[30px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
