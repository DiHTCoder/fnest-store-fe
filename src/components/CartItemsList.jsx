import React from 'react';
import { useSelector } from 'react-redux';
import { CartItem } from '../components';
import image from '../assets/cart/gio-hang-trong.jpg';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const CartItemsList = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(clearCart());
        toast.success('Đã xóa tất cả sản phẩm!');
    };

    return (
        <div className="card py-4 bg-base-100 shadow-sm mx-2 lg:px-10 px-4">
            {cart.cartItems.length === 0 ? (
                <>
                    <div className="flex flex-col items-center lg:text-xl text-sm py-10">
                        <img src={image} alt="Giỏ hàng trống" />
                        <p className="font-bold">Giỏ hàng trống!</p>
                        <p>Hãy tiếp tục mua sắm thoải mái bạn nhé!</p>
                    </div>
                </>
            ) : (
                <>
                    {cart.cartItems.map((cartItem) => (
                        <CartItem item={cartItem} key={cartItem.id} />
                    ))}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <button className="btn btn-outline btn-info">Khám phá ngay</button>
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={() => {
                                handleDeleteAll();
                            }}
                        >
                            Xóa tất cả
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartItemsList;
