import { Breadcrumb, Loading } from '../components';
import addressServices from '../services/addressServices';
import productServices from '../services/productServices';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { SiGooglemaps } from 'react-icons/si';
import { CiDiscount1, CiShoppingCart } from 'react-icons/ci';
import { setOrderTotal, applyDiscountCode, getTotals, clearCart } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import orderServices from '../services/orderServices';
import { BiTargetLock } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const token = useSelector((state) => state.auth.login?.token);
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        scrollTo(0, 0);
        if (!token) {
            navigateTo('/login');
        } else {
            getAllUserAddresses();
        }
    }, []);
    const getAllUserAddresses = async () => {
        try {
            const resp = await addressServices.getDeliveryAddress(token);
            setAddress(resp.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCouponCodeChange = (event) => {
        setCouponCode(event.target.value);
        setOrderTotal();
    };

    const handleApplyCode = async () => {
        try {
            const response = await productServices.applyCouponCode(cart.cartTotalAmount, couponCode);
            setDiscountAmount(response.data);
            dispatch(
                applyDiscountCode({
                    couponCode: couponCode,
                    discount: response.data.discount,
                    shipping: response.data.shipping_charge,
                }),
            );
            setCouponCode('');
            toast.success(response.messages[0]);
        } catch (error) {
            console.error('Lỗi:', error);
            toast.error('Mã giảm giá không tồn tại!');
        }
    };

    const orderItems = async () => {
        if (address.defaultAddressId == null) {
            toast.warning('Vui lòng thêm địa chỉ giao hàng');
        } else {
            try {
                const orderData = {
                    shippingCharge: cart.shipping,
                    deliveryAddressId: address.defaultAddressId,
                    code: cart.discountCode,
                    paymentMethod: 'COD',
                    orderItemList: cart.cartItems.map((item) => ({
                        productId: item.id,
                        quantity: item.cartQuantity,
                    })),
                };
                const resp = await orderServices.ordering(token, orderData);
                if (resp.data) {
                    toast.success(resp.messages[0]);
                    dispatch(clearCart());
                    dispatch(getTotals());
                    navigateTo('/orders');
                }
            } catch (error) {
                console.error('Error placing order:', error);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Breadcrumb url="checkout" page="Thanh toán" />

                    {/* Address */}
                    <div className="card bg-base-100 shadow-sm my-4">
                        <div className="m-5">
                            <div className="flex gap-2 items-center">
                                <SiGooglemaps />
                                <span className="lg:text-base text-sm">Địa chỉ nhận hàng</span>
                            </div>
                            {address.defaultAddressId === null ? (
                                <div className="flex items-center">
                                    <Link to="/address">
                                        <button className="btn btn-ghost">Thêm địa chỉ nhận hàng</button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="md:flex justify-between">
                                    <div>
                                        {address.deliveryAddresses.length > 0 &&
                                            address.deliveryAddresses.map((item) => (
                                                <div className="lg:text-base text-sm">
                                                    {item.id === address.defaultAddressId ? (
                                                        <div className="md:flex m-4" key={item.id}>
                                                            <span className="font-bold">{item.receiverName}</span>
                                                            <span className="ml-2 font-bold">
                                                                ({item.receiverPhone})
                                                            </span>
                                                            <div className="md:mx-10">
                                                                <p className="">{item.deliveryAddress}</p>
                                                            </div>
                                                            <div className="flex text-center items-center space-x-2">
                                                                <div className="text-primary flex items-center">
                                                                    <BiTargetLock />
                                                                    <span> Mặc định</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    <div className="flex items-center">
                                        <Link to="/address">
                                            <div className="lg:text-base text-sm text-blue-500">Đổi địa chỉ</div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order items */}
                    <div className="card bg-base-100 shadow-sm ">
                        <div className="m-5 lg:text-base text-sm">
                            <div className="flex gap-2 items-center border-b-[1px] mb-2">
                                <CiShoppingCart />
                                <span className="lg:text-base text-sm my-2">Sản phẩm</span>
                            </div>
                            <div className="grid md:grid-cols-5 grid-cols-2 font-bold items-center text-center">
                                <div>Hình ảnh</div>
                                <div>Tên</div>
                                <div>Kích thước</div>
                                <div>Số lượng</div>
                                <div>Đơn giá</div>
                            </div>
                            {cart.cartItems.map((cartItem) => {
                                return (
                                    <div
                                        className="grid md:grid-cols-5 grid-cols-2 my-4 gap-x-10 text-center items-center"
                                        key={cartItem.id}
                                    >
                                        <div className="flex justify-center md:border-b-0 border-b-2">
                                            <img src={cartItem.thumbnail} alt="" className="max-w-[50%]" />
                                        </div>
                                        <div className="md:border-b-0 border-b-2">{cartItem.name}</div>
                                        <div className="md:border-b-0 border-b-2">{cartItem.size}</div>
                                        <div>{cartItem.cartQuantity}</div>
                                        {cartItem.onSale ? (
                                            <div>{formatPrice(cartItem.cartQuantity * cartItem.salePrice)}</div>
                                        ) : (
                                            <div>{formatPrice(cartItem.cartQuantity * cartItem.price)}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/*  Coupon */}
                    <div className="card bg-base-100 lg:text-base text-sm shadow-sm my-4">
                        <div className="m-5">
                            <div className="flex gap-2 items-center">
                                <CiDiscount1 className="w-6 h-6" />
                                <span className="">Mã giảm giá</span>
                            </div>
                            <div className="join my-4">
                                <input
                                    className="input input-bordered join-item"
                                    placeholder="Mã giảm giá"
                                    onBlur={handleCouponCodeChange}
                                />
                                <button className="btn join-item rounded-r-full" onClick={handleApplyCode}>
                                    Apply
                                </button>
                            </div>
                            {cart.discountCode ? (
                                <>
                                    <div>
                                        <h2 className="font-bold text-error">Mã giảm giá: {cart.discountCode}</h2>
                                        <h2 className="font-bold">Giảm: -{formatPrice(cart.discount)}</h2>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {/*  Total */}
                    <div className="card bg-base-100 lg:text-base text-sm shadow-sm my-4">
                        <div className="m-5">
                            <div className="flex gap-2 items-center justify-between ">
                                <span className="">Phương thức thanh toán</span>
                                <span>Thanh toán khi nhận hàng̣ (COD)</span>
                            </div>
                            <div className="flex justify-end border-y-[1px] my-4">
                                <div className="">
                                    <div className="flex gap-2 my-4">
                                        <p>Phí vận chuyển:</p>
                                        <p>{formatPrice(cart.shipping)}</p>
                                    </div>
                                    <div className="flex gap-2 my-4">
                                        <p>Giảm giá:</p>
                                        <p>-{formatPrice(cart.discount)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 my-4">
                                        <p className="font-bold">Tổng thannh toán:</p>
                                        <p className="text-2xl text-primary">{formatPrice(cart.cartTotalAmount)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div></div>
                                <div className="btn btn-ghost btn-primary bg-primary text-white" onClick={orderItems}>
                                    Đặt hàng
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Checkout;
