import axiosClient from '../utils/axiosClient';

const productServices = {
    getFeaturedProducts(params) {
        const url = '/products?featured=true';
        return axiosClient.get(url, { params });
    },

    getProductDetail(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/products/${data.id}`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productServices;
