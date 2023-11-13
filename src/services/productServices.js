import axiosClient from '../utils/axiosClient';

const productServices = {
    getFeaturedProducts(currentPage, pageSize, sort) {
        const url = '/product/featured-page';
        return axiosClient.get(url, { currentPage, pageSize, sort });
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
