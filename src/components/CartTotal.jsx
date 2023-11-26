import React from 'react';
import { formatPrice } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, setOrderTotal, applyDiscountCode } from '../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import orderServices from '../services/orderServices';
import { SubmitButton } from '../components';
import { Link } from 'react-router-dom';

const CartTotal = () => {
    const user = useSelector((state) => state.auth.login?.token);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [totals, setTotals] = useState('');
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await orderServices.getShippingCharge(cart.cartTotalAmount);
                if (response && response.data) {
                    setTotals(response.data);
                }

                dispatch(getTotals());
            } catch (error) {
                console.error('Lỗi khi lấy phí vận chuyển:', error);
            }
        };

        fetch();
    }, [cart, dispatch]);

    const handleSubmit = () => {
        dispatch(setOrderTotal(totals));
    };
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <span className="text-xl font-bold">Tóm tắt đơn hàng</span>

                <p className="flex justify-between text-sm mt-4 pb-2">
                    <span className="font-bold text-sm">Phí vận chuyển</span>
                    <span className="text-sm">{formatPrice(totals.shipping_charge)}</span>
                </p>

                {/* Order Total */}
                <p className="flex justify-between text-sm mt-2 py-4 border-t-2">
                    <span className="font-bold text-sm">Tạm tính</span>
                    <span className="text-sm font-bold">{formatPrice(totals.total)}</span>
                </p>
            </div>
            <div className="mt-2">
                {user ? (
                    <Link to="/checkout">
                        <div className="btn btn-round w-full bg-primary text-white" onClick={handleSubmit}>
                            Đặt hàng
                        </div>
                    </Link>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-block mt-8 text-white">
                        Vui lòng đăng nhập
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CartTotal;
