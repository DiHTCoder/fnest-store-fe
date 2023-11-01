import { CartItemsList, CartTotal } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SubmitButton, Breadcrumb } from '../components';

const Cart = () => {
    const user = useSelector((state) => state.auth.login?.token);
    return (
        <>
            <Breadcrumb url="cart" page="Giỏ hàng" />
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <CartItemsList />
                </div>
                <div className="lg:col-span-4 lg:pl-4 ">
                    <CartTotal />
                    <div className="mt-2">
                        {user ? (
                            <Link to="/checkout">
                                <SubmitButton text="Thanh toán" />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-block mt-8 text-white">
                                Vui lòng đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
