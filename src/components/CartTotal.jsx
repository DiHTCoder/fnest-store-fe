import React from 'react';
import { formatPrice } from '../utils/helpers';
import { FormInput, SubmitButton } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals } from '../features/cart/cartSlice';
import { useEffect } from 'react';

const CartTotal = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <span className="text-xl font-bold">Tóm tắt đơn hàng</span>
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        className="input input-bordered w-full max-w-xs col-span-2"
                    />
                    <button className="btn">Apply</button>
                </div>
                <p className="flex justify-between text-sm mt-4 pb-2">
                    <span className="font-bold text-sm">Giảm giá</span>
                    <span className="text-sm">{formatPrice(cart.cartTotalAmount)}</span>
                </p>

                {/* Order Total */}
                <p className="flex justify-between text-sm mt-2 py-4 border-t-2">
                    <span className="font-bold text-sm">Tổng cộng</span>
                    <span className="text-xl text-primary font-bold">{formatPrice(cart.cartTotalAmount)}</span>
                </p>
            </div>
        </div>
    );
};

export default CartTotal;
