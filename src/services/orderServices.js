import axiosClient from '../utils/axiosClient';

const cartServices = {
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
};

export default cartServices;
