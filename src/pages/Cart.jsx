import { CartItemsList, CartTotal } from '../components';
import { Breadcrumb } from '../components';

const Cart = () => {
    return (
        <>
            <Breadcrumb url="cart" page="Giỏ hàng" />
            <div className="grid gap-8 lg:grid-cols-12 my-6">
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
