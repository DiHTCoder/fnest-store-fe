import axiosClient from '../utils/axiosClient';

const orderServices = {
    getShippingCharge(total) {
        const url = '/shipping-charge';
        return axiosClient.post(url, { total });
    },
    ordering(accessToken, data) {
        const url = '/buyer/order';
        return axiosClient.post(url, data, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
    getAllOrders(accessToken, currentPage, pageSize) {
        const url = `/buyer/order?currentPage=${currentPage}&pageSize=${pageSize}`;
        return axiosClient.get(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
    cancelOrders(accessToken, id, status) {
        const url = `/buyer/order/${id}`;
        return axiosClient.patch(
            url,
            { status },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    getOrderDetail(accessToken, id) {
        const url = `/buyer/order/${id}`;
        return axiosClient.get(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
};

export default orderServices;
