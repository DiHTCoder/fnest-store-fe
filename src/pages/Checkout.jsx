import { SubmitButton, Breadcrumb, Loading } from '../components';
import addressServices from '../services/addressServices';
import productServices from '../services/productServices';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { SiGooglemaps } from 'react-icons/si';
import { CiDiscount1 } from 'react-icons/ci';
import { getTotals, setOrderTotal, applyDiscountCode, clearCart } from '../features/cart/cartSlice';
import { formatPrice, generateAmountOptions } from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import orderServices from '../services/orderServices';
import { BiTargetLock, BiPlus, BiPurchaseTag } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.login?.token);
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
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

            if (response.status === 'FAIL') {
            } else {
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
            }
        } catch (error) {
            console.error('Lỗi:', error);
            toast.error(error);
        }
    };

    const orderItems = async () => {
        try {
            const orderData = {
                total: cart.cartTotalAmount,
                shippingCharge: cart.shipping,
                deliveryAddressId: 1,
                code: cart.discountCode,
                orderDetailList: cart.cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.cartQuantity,
                    total: item.price * item.cartQuantity,
                })),
            };
            const resp = await orderServices.ordering(token, orderData);
            if (resp.data) {
                toast.success(resp.messages[0]);
                dispatch(clearCart());
            }
        } catch (error) {
            console.error('Error placing order:', error);
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
                    <div className="card bg-base-100 shadow-sm mx-2 my-4">
                        <div className="mx-10 my-10">
                            <div className="flex gap-2 items-center">
                                <SiGooglemaps />
                                <span className="text-xl">Địa chỉ nhận hàng</span>
                            </div>
                            {address.defaultAddressId === null ? (
                                <div className="flex items-center">
                                    <p>Vui lòng thêm địa chỉ nhận hàng</p>
                                    <Link to="/address">
                                        <button className="btn btn-ghost">Thêm địa chỉ nhận hàng</button>
                                    </Link>
                                </div>
                            ) : (
                                address.deliveryAddresses.length > 0 &&
                                address.deliveryAddresses.map((item) => (
                                    <>
                                        {item.id === address.defaultAddressId ? (
                                            <div className="flex my-2" key={item.id}>
                                                <span className="font-bold">{item.receiverName}</span>
                                                <span className="ml-2 font-bold">({item.receiverPhone})</span>
                                                <div className="mx-10">
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
                                    </>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Order items */}
                    <div className="card bg-base-100 shadow-sm mx-2">
                        <div className="mx-10 my-10">
                            <div className="flex gap-2 items-center border-b-[1px] mb-2">
                                <span className="text-xl my-2 ">Sản phẩm</span>
                            </div>
                            <div className="grid grid-cols-5 font-bold ">
                                <div>Hình ảnh</div>
                                <div>Tên</div>
                                <div>Kích thước</div>
                                <div>Số lượng</div>
                                <div>Đơn giá</div>
                            </div>
                            {cart.cartItems.map((cartItem) => {
                                return (
                                    <div className="grid grid-cols-5 my-10" key={cartItem.id}>
                                        <div>
                                            <img src={cartItem.thumbnail} alt="" className="max-w-[50%]" />
                                        </div>
                                        <div>{cartItem.name}</div>
                                        <div>{cartItem.size}</div>
                                        <div>{cartItem.cartQuantity}</div>
                                        <div>{formatPrice(cartItem.cartQuantity * cartItem.price)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/*  Coupon */}
                    <div className="card bg-base-100 shadow-sm mx-2 my-4">
                        <div className="mx-10 my-10">
                            <div className="flex gap-2 items-center">
                                <CiDiscount1 className="w-6 h-6" />
                                <span className="text-xl">Mã giảm giá</span>
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
                                        <h2>Mã giảm giá: {cart.discountCode}</h2>
                                        <h2>Số tiền giảm được: {formatPrice(cart.discount)}</h2>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {/*  Total */}
                    <div className="card bg-base-100 shadow-sm mx-2 my-4">
                        <div className="mx-10 my-10">
                            <div className="flex gap-2 items-center justify-between ">
                                <span className="text-xl">Phương thức thanh toán</span>
                                <span>Thanh toán khi nhận hàng</span>
                            </div>
                            <div className="flex justify-end border-y-[1px] my-4">
                                <div className="">
                                    <div className="flex gap-2 my-4">
                                        <p>Tổng tiền hàng:</p>
                                        <p>{formatPrice(cart.cartTotalAmount)}</p>
                                    </div>
                                    <div className="flex gap-2 my-4">
                                        <p>Phí vận chuyển:</p>
                                        <p>{formatPrice(cart.shipping)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 my-4">
                                        <p>Tổng thannh toán:</p>
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
