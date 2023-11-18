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

    getAllProducts(name, currentPage, pageSize, sort, priceMin) {
        const url = `product/search-filter?name.contains=${name}&currentPage=${currentPage}&pageSize=${pageSize}&sort=${sort}&price.min=${priceMin}`;
        return axiosClient.get(url);
    },
};

export default productServices;
