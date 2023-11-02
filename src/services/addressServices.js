import axiosClient from '../utils/axiosClient';

const addressServices = {
    getAllProvinces() {
        const url = '/address/province-city';
        return axiosClient.get(url);
    },
    getAllDistrict(name) {
        const url = `/address/district?name=${name}`;
        return axiosClient.get(url);
    },
    getAllWard(name) {
        const url = `/address/commune-ward-town?name=${name}`;
        return axiosClient.get(url);
    },
    getDeliveryAddress(accessToken) {
        const url = '/buyer/delivery-address';
        return axiosClient.get(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
    updateDeliveryAddress(
        accessToken,
        id,
        addressDetail,
        receiverName,
        receiverPhone,
        communeWardTownName,
        provinceCityName,
        districtName,
    ) {
        const url = `/buyer/delivery-address/${id}`;
        return axiosClient.put(
            url,
            { addressDetail, receiverName, receiverPhone, communeWardTownName, provinceCityName, districtName },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    deleteDeliveryAddress(accessToken, id) {
        const url = `/buyer/delivery-address/${id}`;
        return axiosClient.delete(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
    setDefaultAddress(accessToken, defaultAddressId) {
        const url = `/buyer/delivery-address/default`;
        return axiosClient.patch(
            url,
            { defaultAddressId },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    addDeliveryAddress(
        accessToken,
        addressDetail,
        receiverName,
        receiverPhone,
        communeWardTownName,
        provinceCityName,
        districtName,
    ) {
        const url = '/buyer/delivery-address';
        return axiosClient.post(
            url,
            {
                addressDetail,
                receiverName,
                receiverPhone,
                communeWardTownName,
                provinceCityName,
                districtName,
            },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
};

export default addressServices;
