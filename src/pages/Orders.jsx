import { NavProfile, Loading } from '../components';
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
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [rating, setRating] = useState(5);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const filteredOrders = activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab);

    const token = useSelector((state) => state.auth.login?.token);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const resp = await orderServices.getAllOrders(token, 0, 12);
                setIsLoading(false);
                setOrders(resp.data.content);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const handleCancelOrder = async (id) => {
        try {
            const resp = await orderServices.cancelOrders(token, id, 'PENDING');
            if (resp.status == 'OK') {
                toast.success(resp.messages[0]);
            }
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
        }
    };

    const getOrderDetailById = async (id) => {
        try {
            const resp = await orderServices.getOrderDetail(token, id);
            if (resp.status == 'OK') {
                setSelectedOrderDetails(resp.data);
                document.getElementById('detail_order_dialog').showModal();
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
    };

    const handleReviewProduct = async () => {
        try {
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
    };
    return (
        <div className="grid grid-cols-4 mt-10 mb-40">
            <NavProfile />
            <div className="card col-span-3 bg-white">
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
                        onClick={() => setActiveTab('CANCELED')}
                        className={`tab ${activeTab === 'CANCELED' ? 'tab-active' : ''}`}
                    >
                        Đã hủy
                    </button>
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="mx-10 my-4">
                        {filteredOrders.length === 0 ? (
                            <div className="flex items-center justify-center">
                                <div>
                                    <img src={image} alt="" />
                                    <p className=" text-lg text-center font-bold">Bạn chưa có đơn hàng nào</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {filteredOrders.map((order) => (
                                    <div key={order.id}>
                                        {/* dialog */}
                                        <dialog id="cancel_dialog" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        ✕
                                                    </button>
                                                </form>
                                                <h3 className="font-bold text-lg">Hủy đơn hàng</h3>
                                                <div className="divider"></div>
                                                <p className="">
                                                    Đơn hàng sẽ không thể phục hồi và hóa đơn điện tử sẽ bị hủy. Bạn có
                                                    chắc chắn hủy đơn hàng này không?
                                                </p>
                                                <div className="divider"></div>
                                                <div className="flex items-center">
                                                    <button
                                                        className="btn btn-ghost bg-primary text-white"
                                                        onClick={() => handleCancelOrder(order.id)}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                    <button className="btn btn-ghost btn-info">Hủy</button>
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
                                                    {selectedOrderDetails.orderItemList.map((product) => {
                                                        return (
                                                            <div className="my-4" key={product.productName}>
                                                                <div className="my-4">
                                                                    <p>Danh sách sản phẩm</p>
                                                                    <div className="divider"></div>
                                                                </div>
                                                                <>
                                                                    <div className="flex relative flex-col sm:flex-row gap-y-4 gap-x-2 flex-wrap">
                                                                        <img
                                                                            src={product.productThumbnail}
                                                                            alt={product.productName}
                                                                            className="h-[60px] w-[60px] rounded-lg object-cover"
                                                                        />
                                                                        <div className="ml-0">
                                                                            <div className="flex">
                                                                                <h3 className="capitalize font-medium text-lg">
                                                                                    {product.productName}
                                                                                </h3>
                                                                            </div>
                                                                            <p> {product.material}</p>
                                                                            <h4 className="capitalize my-1 text-md text-neutral-content">
                                                                                <span className="text-sm">
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
                                                                </>
                                                                <div className="divider"></div>
                                                                <div className="my-4">
                                                                    <p>Thông tin chi tiết</p>
                                                                </div>
                                                                <ul className="steps w-full">
                                                                    <li
                                                                        className={`step ${
                                                                            selectedOrderDetails.status === 'PENDING'
                                                                                ? 'step-success'
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        <div className="flex flex-col h-full">
                                                                            <div>Đơn hàng đã đặt</div>
                                                                            <div>
                                                                                <p className="text-sm text-base-400">
                                                                                    {formatDate(
                                                                                        selectedOrderDetails.createdAt,
                                                                                    )}
                                                                                </p>
                                                                                <p className="text-sm text-base-400">
                                                                                    Tổng:{' '}
                                                                                    {formatPrice(
                                                                                        selectedOrderDetails.total,
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li
                                                                        className={`step ${
                                                                            selectedOrderDetails.status === 'CONFIRMED'
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
                                                                            selectedOrderDetails.status ===
                                                                            'IN_SHIPPING'
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
                                                                        {' '}
                                                                        <div className="flex flex-col h-full">
                                                                            <div>Đơn hàng đã hoàn thành</div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                                <div className="divider"></div>
                                                                <p>Địa chỉ nhận hàng</p>
                                                                <div className="flex mx-2 justify-between">
                                                                    <div>
                                                                        <p>
                                                                            {
                                                                                selectedOrderDetails.deliveryAddress
                                                                                    .receiverName
                                                                            }
                                                                        </p>
                                                                        <p className="text-gray-400">
                                                                            {
                                                                                selectedOrderDetails.deliveryAddress
                                                                                    .receiverPhone
                                                                            }
                                                                        </p>
                                                                        <p className="text-gray-400">
                                                                            {
                                                                                selectedOrderDetails.deliveryAddress
                                                                                    .deliveryAddress
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p>
                                                                            Phí vận chuyển:{' '}
                                                                            {formatPrice(
                                                                                selectedOrderDetails.shippingCharge,
                                                                            )}
                                                                        </p>
                                                                        <p>
                                                                            Giảm giá:{' '}
                                                                            {selectedOrderDetails.codeDiscount}
                                                                        </p>
                                                                        <p className="text-primary font-bold text-xl">
                                                                            Tổng đơn:{' '}
                                                                            {formatPrice(selectedOrderDetails.total)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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
                                            <div className="modal-box w-11/12 max-w-3xl">
                                                <h3 className="font-bold text-lg">Đánh giá sản phẩm</h3>
                                                <div className="flex items-center gap-x-5 my-3">
                                                    <p>Chất lượng sản phẩm</p>
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <span key={index} onClick={() => setRating(index + 1)}>
                                                            {index < rating ? (
                                                                <FaStar className="w-8 h-8 text-amber-500" />
                                                            ) : (
                                                                <FaRegStar className="w-8 h-8 text-amber-500" />
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
                                                    placeholder="Type here"
                                                    className="input input-bordered input-lg w-full"
                                                />
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                        <div className="flex items-center justify-between my-2 ">
                                            <p className="font-bold">Mã đơn hàng: {order.id}</p>
                                            {order.status === 'COMPLETED' ? (
                                                <div className="flex gap-2">
                                                    <div className="flex items-center gap-2 text-success">
                                                        <CiDeliveryTruck />
                                                        <p>Đơn hàng đã được giao thành công</p>
                                                    </div>
                                                    <button onClick={() => getOrderDetailById(order.id)}>
                                                        Xem chi tiết
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => getOrderDetailById(order.id)}>
                                                        Xem chi tiết
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        {order.responses.map((product) => {
                                            return (
                                                <div className="my-4" key={product.id}>
                                                    <div className="flex relative flex-col sm:flex-row gap-y-4 gap-x-2 flex-wrap">
                                                        <img
                                                            src={product.productThumbnail}
                                                            alt={product.productName}
                                                            className="h-[60px] w-[60px] rounded-lg object-cover"
                                                        />
                                                        <div className="ml-0">
                                                            <div className="flex">
                                                                <h3 className="capitalize font-medium text-lg">
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
                                        <div className="flex my-4 justify-between">
                                            <p>Tổng: {formatPrice(order.total)}</p>
                                            {order.status == 'PENDING' || order.status === 'CONFIRMED' ? (
                                                <button
                                                    className="text-error"
                                                    onClick={() => document.getElementById('cancel_dialog').showModal()}
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
                                                        onClick={() =>
                                                            document.getElementById('feadback_order_dialog').showModal()
                                                        }
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
