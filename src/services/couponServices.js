import axiosClient from '../utils/axiosClient';

const couponServices = {
    getAllCoupon() {
        const url = '/coupon-code';
        return axiosClient.get(url);
    },
};

export default couponServices;
