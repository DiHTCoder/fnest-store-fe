import { NavProfile, Loading, Pagination } from '../components';
import { useSelector } from 'react-redux';
import orderServices from '../services/orderServices';
import productServices from '../services/productServices';
import { useEffect, useState } from 'react';
import { formatPrice } from '../utils/helpers';
import image from '../assets/cart/gio-hang-trong.jpg';
import { toast } from 'react-toastify';
import { BsCashStack } from 'react-icons/bs';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';

const Orders = () => {
    const [resp, setResp] = useState('');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [orderId, setOrderId] = useState(null);
    const [status, setStatus] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [selectedProductsForReview, setSelectedProductsForReview] = useState([]);
    const [productReviews, setProductReviews] = useState([]);
    const [reviewedProducts, setReviewedProducts] = useState([]);
    const filteredOrders = activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab);

    const token = useSelector((state) => state.auth.login?.token);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const resp = await orderServices.getAllOrders(token, 0, 5);
            setIsLoading(false);
            setOrders(resp.data.content);
            setResp(resp.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    const handlePageChange = async (page) => {
        setIsLoading(true);
        try {
            const products = await orderServices.getAllOrders(token, page, 5);
            setIsLoading(false);
            setOrders(products.data.content);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const closeDialog = () => {
        document.getElementById('feadback_order_dialog').close();
        setProductReviews([]);
        setReviewedProducts([]);
    };
    const openCancelOrderDialog = (id, status) => {
        document.getElementById('cancel_dialog').showModal();
        setOrderId(id);
        setStatus(status);
    };
    const handleCancelOrder = async () => {
        setIsLoading(true);
        try {
            document.getElementById('cancel_dialog').close();
            const resp = await orderServices.cancelOrders(token, orderId, status);
            if (resp.status === 'OK') {
                toast.success(resp.messages[0]);
                fetchOrders();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                toast.error(errorMessages.join(', ')); // Display error messages from the response
            } else {
                toast.error('Có lỗi xảy ra.'); // Fallback error message
            }
        }
    };

    const handleGetOrderDetailById = async (id) => {
        await getOrderDetailById(id);
        document.getElementById('detail_order_dialog').showModal();
    };

    const saveReview = (product) => {
        const existingReviewIndex = productReviews.findIndex((review) => review.id === product.id);

        if (existingReviewIndex !== -1) {
            const updatedReviews = [...productReviews];
            updatedReviews[existingReviewIndex] = {
                id: product.id,
                rating,
                comment,
            };
            setProductReviews(updatedReviews);
        } else {
            setProductReviews((prevReviews) => [
                ...prevReviews,
                {
                    id: product.id,
                    rating,
                    comment,
                },
            ]);
        }
        setReviewedProducts((prevReviewedProducts) => [...prevReviewedProducts, product.id]);
        setRating(0);
        setComment('');
    };

    const getOrderDetailById = async (id) => {
        try {
            const resp = await orderServices.getOrderDetail(token, id);
            if (resp.status == 'OK') {
                setSelectedOrderDetails(resp.data);
                setSelectedProductsForReview(resp.data.orderItemList);
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
    };

    const makeReview = async (order) => {
        await getOrderDetailById(order.id);
        document.getElementById('feadback_order_dialog').showModal();
    };
    const handleReviewProduct = async () => {
        setIsLoading(true);
        try {
            if (productReviews.length === 0) {
                toast.error('Bạn chưa thêm đánh giá');
                return;
            }
            for (const product of productReviews) {
                const { comment, rating, id } = product;
                const resp = await productServices.reviewProduct(token, id, comment, rating);
                if (resp.status === 'OK') {
                    toast.success('Gửi đánh giá thành công!');
                    fetchOrders();
                    setIsLoading(false);
                } else {
                    toast.error('Gửi đánh giá thất bại!');
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
    };
    return (
        <div className="grid md:grid-cols-4 gap-2 md:mt-10 lg:mb-30 mb-10">
            <NavProfile />
            <div className="card md:col-span-3 bg-white shadow-lg">
                <div role="tablist" className="tabs tabs-bordered my-2 border-b-[1px]">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
                    >
                        Tất cả ({orders.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('PENDING')}
                        className={`tab ${activeTab === 'PENDING' ? 'tab-active' : ''}`}
                    >
                        Chờ xác nhận
                    </button>
                    <button
                        onClick={() => setActiveTab('CONFIRMED')}
                        className={`tab ${activeTab === 'CONFIRMED' ? 'tab-active' : ''}`}
                    >
                        Đã xác nhận
                    </button>
                    <button
                        onClick={() => setActiveTab('IN_SHIPPING')}
                        className={`tab ${activeTab === 'IN_SHIPPING' ? 'tab-active' : ''}`}
                    >
                        Đang giao
                    </button>
                    <button
                        onClick={() => setActiveTab('COMPLETED')}
                        className={`tab ${activeTab === 'COMPLETED' ? 'tab-active' : ''}`}
                    >
                        Đã giao
                    </button>
                    <button
                        onClick={() => setActiveTab('REVIEWED')}
                        className={`tab ${activeTab === 'REVIEWED' ? 'tab-active' : ''}`}
                    >
                        Đã hoàn thành
                    </button>
                    <button
                        onClick={() => setActiveTab('CANCELED')}
                        className={`tab ${activeTab === 'CANCELED' ? 'tab-active' : ''}`}
                    >
                        Đã hủy
                    </button>
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="lg:mx-10 mx-3 lg:my-4">
                        {filteredOrders.length === 0 ? (
                            <div className="flex items-center justify-center">
                                <div>
                                    <img src={image} alt="" />
                                    <p className="lg:text-lg text-sm text-center font-bold">Bạn chưa có đơn hàng nào</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {filteredOrders.map((order) => (
                                    <div key={order.id}>
                                        {/* dialog cancel order */}
                                        <dialog id="cancel_dialog" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        ✕
                                                    </button>
                                                </form>
                                                <h3 className="font-bold text-lg text-center">Hủy đơn hàng</h3>
                                                <div className="divider"></div>
                                                <p className="text-center">
                                                    Đơn hàng sẽ không thể phục hồi và hóa đơn điện tử sẽ bị hủy. Bạn có
                                                    chắc chắn hủy đơn hàng này không?
                                                </p>
                                                <div className="divider"></div>
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        className="btn btn-ghost bg-primary text-white"
                                                        onClick={() => handleCancelOrder(order.id, order.status)}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                        {/* order detail */}
                                        <dialog id="detail_order_dialog" className="modal">
                                            {selectedOrderDetails && (
                                                <div className="modal-box w-11/12 max-w-4xl">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-bold text-lg">Chi tiết đơn hàng</h3>
                                                    </div>
                                                    <h3 className="">Mã đơn hàng: {selectedOrderDetails.id}</h3>
                                                    <div className="my-4">
                                                        <div className="my-2">
                                                            <p>Danh sách sản phẩm</p>
                                                            <div className="divider"></div>
                                                        </div>
                                                    </div>
                                                    {selectedOrderDetails.orderItemList.map((product) => {
                                                        return (
                                                            <>
                                                                <div className="flex relative flex-col sm:flex-row gap-y-2   gap-x-2 flex-wrap">
                                                                    <img
                                                                        src={product.productThumbnail}
                                                                        alt={product.productName}
                                                                        className="h-[60px] w-[60px] rounded-lg object-cover"
                                                                    />
                                                                    <div className="ml-0">
                                                                        <div className="flex">
                                                                            <h3 className="capitalize font-medium lg:text-lg md:text-md text-sm">
                                                                                {product.productName}
                                                                            </h3>
                                                                        </div>
                                                                        <p> {product.material}</p>
                                                                        <h4 className="capitalize my-1 lg:text-lg md:text-md text-sm text-neutral-content">
                                                                            <span className="lg:text-lg md:text-md text-sm">
                                                                                Số lượng:{' '}
                                                                            </span>
                                                                            {product.quantity}
                                                                        </h4>
                                                                    </div>
                                                                    <div className="ml-0 sm:ml-auto">
                                                                        <div className="flex items-center gap-2">
                                                                            <BsCashStack />
                                                                            <p className="">
                                                                                {formatPrice(product.total)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="divider"></div>
                                                            </>
                                                        );
                                                    })}
                                                    <div className="lg:my-4 my-2">
                                                        <p>Thông tin chi tiết</p>
                                                    </div>
                                                    <ul className="steps w-full md:text-base text-sm">
                                                        <li
                                                            className={`step ${
                                                                selectedOrderDetails.status === 'PENDING' ||
                                                                selectedOrderDetails.status === 'IN_SHIPPING' ||
                                                                selectedOrderDetails.status === 'COMPLETED'
                                                                    ? 'step-success'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="flex flex-col h-full">
                                                                <div>Đơn hàng đã đặt</div>
                                                                <div>
                                                                    <p className="text-sm text-base-400">
                                                                        {formatDate(selectedOrderDetails.createdAt)}
                                                                    </p>
                                                                    <p className="text-sm text-base-400">
                                                                        Tổng: {formatPrice(selectedOrderDetails.total)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className={`step ${
                                                                selectedOrderDetails.status === 'CONFIRMED' ||
                                                                selectedOrderDetails.status === 'IN_SHIPPING' ||
                                                                selectedOrderDetails.status === 'COMPLETED'
                                                                    ? 'step-success'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="flex flex-col h-full">
                                                                <div>Thanh toán</div>
                                                                <div>
                                                                    <p className="text-sm text-base-400">
                                                                        Thanh toán khi nhận hàng
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className={`step ${
                                                                selectedOrderDetails.status === 'IN_SHIPPING' ||
                                                                selectedOrderDetails.status === 'COMPLETED'
                                                                    ? 'step-success'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="flex flex-col h-full">
                                                                <div>Vận chuyển</div>
                                                                <div>
                                                                    <p className="text-sm text-base-400">
                                                                        Đơn hàng đang được vận chuyển
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className={`step ${
                                                                selectedOrderDetails.status === 'COMPLETED'
                                                                    ? 'step-success'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <div className="flex flex-col h-full">
                                                                <div>Đơn hàng đã hoàn thành</div>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                    <div className="divider"></div>
                                                    <p>Địa chỉ nhận hàng</p>
                                                    <div className="flex mx-2 justify-between text-sm md:text-base">
                                                        <div>
                                                            <p className="text-gray-400">
                                                                {selectedOrderDetails.deliveryAddress.receiverName}
                                                            </p>
                                                            <p className="text-gray-400">
                                                                {selectedOrderDetails.deliveryAddress.receiverPhone}
                                                            </p>
                                                            <p className="text-gray-400">
                                                                {selectedOrderDetails.deliveryAddress.deliveryAddress}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                Phí vận chuyển:{' '}
                                                                {formatPrice(selectedOrderDetails.shippingCharge)}
                                                            </p>
                                                            <p>
                                                                Giảm giá:{' '}
                                                                {formatPrice(selectedOrderDetails.codeDiscount)}
                                                            </p>
                                                            <p className="text-primary font-bold text-xl">
                                                                Tổng đơn: {formatPrice(selectedOrderDetails.total)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                                ✕
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </dialog>
                                        {/* review product */}
                                        <dialog id="feadback_order_dialog" className="modal">
                                            <div className="modal-box w-11/12 lg:max-w-3xl max-w-lg lg:text-lg text-sm">
                                                <div
                                                    onClick={closeDialog}
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                >
                                                    X
                                                </div>
                                                <h3 className="font-bold ">Đánh giá sản phẩm</h3>

                                                <div className="my-4">
                                                    <p>Danh sách sản phẩm đánh giá</p>
                                                    <div className="divider"></div>
                                                </div>

                                                {selectedProductsForReview.map((product) => (
                                                    <>
                                                        <div
                                                            className="flex relative flex-col sm:flex-row gap-y-2   gap-x-2 flex-wrap"
                                                            key={product.id}
                                                        >
                                                            <img
                                                                src={product.productThumbnail}
                                                                alt={product.productName}
                                                                className="h-[60px] w-[60px] rounded-lg object-cover"
                                                            />
                                                            <div className="ml-0">
                                                                <div className="flex">
                                                                    <h3 className="capitalize font-medium ">
                                                                        {product.productName}
                                                                    </h3>
                                                                </div>
                                                                <p> {product.material}</p>
                                                                <h4 className="capitalize my-1 text-md text-neutral-content">
                                                                    <span className="text-sm">Số lượng: </span>
                                                                    {product.quantity}
                                                                </h4>
                                                            </div>
                                                            <div className="ml-0 sm:ml-auto">
                                                                <div className="flex items-center gap-2">
                                                                    <BsCashStack />
                                                                    <p className="">{formatPrice(product.total)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {productReviews.length > 0 && (
                                                            <>
                                                                {productReviews.map((productReview) => {
                                                                    if (productReview.id === product.id) {
                                                                        return (
                                                                            <div key={productReview.id}>
                                                                                <h4>Thông tin đánh giá đã gửi</h4>
                                                                                <p>
                                                                                    Điểm đánh giá:{' '}
                                                                                    {productReview.rating}
                                                                                </p>
                                                                                <p>Nhận xét: {productReview.comment}</p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </>
                                                        )}
                                                        {!reviewedProducts.includes(product.id) && (
                                                            <>
                                                                <div className="flex items-center gap-x-5 my-3">
                                                                    <p>Chất lượng sản phẩm</p>
                                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                                        <span
                                                                            key={index}
                                                                            onClick={() => setRating(index + 1)}
                                                                        >
                                                                            {index < rating ? (
                                                                                <FaStar className="lg:w-8 lg:h-8 w-4 h-4 text-amber-500" />
                                                                            ) : (
                                                                                <FaRegStar className="lg:w-8 lg:h-8 w-4 h-4 text-amber-500" />
                                                                            )}
                                                                        </span>
                                                                    ))}
                                                                    <span className="ml-2">
                                                                        {rating === 1 && ' Tệ'}
                                                                        {rating === 2 && ' Không hài lòng'}
                                                                        {rating === 3 && ' Bình thường'}
                                                                        {rating === 4 && ' Hài lòng'}
                                                                        {rating === 5 && ' Tuyệt vời'}
                                                                    </span>
                                                                </div>
                                                                <p className="py-3">Nhận xét</p>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Viết đánh giá"
                                                                    className="input input-bordered lg:input-lg w-full"
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                />
                                                                <button
                                                                    className="btn btn-ghost btn-sm my-2"
                                                                    onClick={() => saveReview(product)}
                                                                >
                                                                    Lưu đánh giá
                                                                </button>
                                                            </>
                                                        )}

                                                        <div className="divider"></div>
                                                    </>
                                                ))}
                                                <div className="modal-action flex items-center justify-between">
                                                    <button
                                                        className="btn btn-primary text-white"
                                                        onClick={handleReviewProduct}
                                                    >
                                                        Gửi đánh giá
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                        <div className="flex items-center justify-between my-2 text-sm lg:text-base">
                                            <p className="font-bold">Mã đơn hàng: {order.id}</p>

                                            <>
                                                <button onClick={() => handleGetOrderDetailById(order.id)}>
                                                    Xem chi tiết
                                                </button>
                                            </>
                                        </div>
                                        {order.responses.map((product) => {
                                            return (
                                                <div className="my-4" key={product.id}>
                                                    <div className="flex relative flex-col sm:flex-row gap-y-2 gap-x-2 flex-wrap">
                                                        <img
                                                            src={product.productThumbnail}
                                                            alt={product.productName}
                                                            className="h-[60px] w-[60px] rounded-lg object-cover"
                                                        />
                                                        <div className="ml-0">
                                                            <div className="flex">
                                                                <h3 className="capitalize font-medium">
                                                                    {product.productName}
                                                                </h3>
                                                            </div>
                                                            <h4 className="capitalize my-1 text-md text-neutral-content">
                                                                <span className="text-sm">Số lượng: </span>
                                                                {product.quantity}
                                                            </h4>
                                                        </div>
                                                        <div className="ml-0 sm:ml-auto">
                                                            <div className="flex items-center gap-2">
                                                                <BsCashStack />
                                                                <p className="">{formatPrice(product.total)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {order.status === 'COMPLETED' ? (
                                            <div className="">
                                                <p>Tổng tiền: {formatPrice(order.total)}</p>
                                                <div className="flex items-center gap-1 text-success">
                                                    <CiDeliveryTruck />
                                                    <p>Đơn hàng đã được giao thành công</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p>Tổng tiền: {formatPrice(order.total)}</p>
                                            </>
                                        )}
                                        <div className="flex justify-between">
                                            {order.status == 'PENDING' || order.status === 'CONFIRMED' ? (
                                                <button
                                                    className="text-error"
                                                    onClick={() => openCancelOrderDialog(order.id, order.status)}
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                            {order.status === 'COMPLETED' ? (
                                                <>
                                                    <button
                                                        className="btn bg-primary text-white"
                                                        onClick={() => makeReview(order)}
                                                    >
                                                        Đánh giá sản phẩm
                                                    </button>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </>
                        )}
                        {resp.totalPages > 1 ? (
                            <Pagination
                                totalPages={resp.totalPages}
                                currentPage={resp.currentPage}
                                onPageChange={handlePageChange}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
