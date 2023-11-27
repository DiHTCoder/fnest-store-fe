import { NavProfile, Loading } from '../components';
import { useSelector } from 'react-redux';
import orderServices from '../services/orderServices';
import { useEffect, useState } from 'react';
import { formatPrice } from '../utils/helpers';
import image from '../assets/cart/gio-hang-trong.jpg';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    console.log(orders);
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

    const filteredOrders = activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab);

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
                        onClick={() => setActiveTab('pending')}
                        className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
                    >
                        Chờ thanh toán
                    </button>

                    <button
                        onClick={() => setActiveTab('shipping')}
                        className={`tab ${activeTab === 'shipping' ? 'tab-active' : ''}`}
                    >
                        Giao hàng
                    </button>
                    <button
                        onClick={() => setActiveTab('cancel')}
                        className={`tab ${activeTab === 'cancel' ? 'tab-active' : ''}`}
                    >
                        Đã hủy
                    </button>
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="mx-10 my-4">
                        {filteredOrders.length === 0 ? (
                            <div className="flex items-center">
                                <img src={image} alt="" />
                                <p className=" text-lg text-center font-bold">Chưa có đơn hàng nào.</p>
                            </div>
                        ) : (
                            <>
                                {filteredOrders.map((order) => (
                                    <div className="border-b-[1px] mb-10" key={order.id}>
                                        <div className="flex items-center justify-between my-2 font-bold">
                                            <p>Mã đơn hàng: {order.id}</p>
                                            <p>Trạng thái: {order.status}</p>
                                        </div>
                                        {order.responses.map((product) => {
                                            return (
                                                <div className="my-4" key={product.id}>
                                                    <div className="flex relative flex-col sm:flex-row gap-y-4 gap-x-2 flex-wrap">
                                                        <img
                                                            src="https://ecooffice.vn/image-process/get-image-v3?path=/datafiles/15765/upload/images/1.1%20%E1%BA%A2NH%20N%C3%89N/combo/4/C9_1_result.jpg&width=0"
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
                                                            <p className="">{formatPrice(product.total)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="flex items-center justify-between my-2 font-bold">
                                            <p>Tổng: {formatPrice(order.total)}</p>
                                        </div>
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
