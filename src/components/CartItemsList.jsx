import React from 'react';
import { useSelector } from 'react-redux';
import { CartItem } from '../components';
const CartItemsList = () => {
    const cartItems = useSelector((state) => state.cart.defaultState.cartItems);
    console.log(cartItems);
    return (
        <div className="card p-8 bg-base-100 shadow-sm">
            <CartItem />
        </div>
    );
};

export default CartItemsList;
