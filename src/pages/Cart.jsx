import { CartItemsList, CartTotal } from '../components';
import { Breadcrumb } from '../components';
import { useEffect } from 'react';

const Cart = () => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);
    return (
        <>
            <Breadcrumb url="cart" page="Giỏ hàng" />
            <div className="grid gap-8 lg:grid-cols-12 my-2">
                <div className="lg:col-span-8">
                    <CartItemsList />
                </div>
                <div className="lg:col-span-4 lg:pl-4 ">
                    <CartTotal />
                </div>
            </div>
        </>
    );
};

export default Cart;
