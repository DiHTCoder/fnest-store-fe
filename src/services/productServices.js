import axiosClient from '../utils/axiosClient';

const productServices = {
    getFeaturedProducts(currentPage, pageSize, sort) {
        const url = '/product/featured-page';
        return axiosClient.get(url, { currentPage, pageSize, sort });
    },

    getProductDetail(id) {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },

    getAllProducts(name, currentPage, pageSize, sort, priceMin) {
        const url = `product/search-filter?name.contains=${name}&currentPage=${currentPage}&pageSize=${pageSize}&sort=${sort}&price.min=${priceMin}`;
        return axiosClient.get(url);
    },
    getProductsByCategory(categoryName, currentPage, pageSize, sort) {
        const url = `product/by-category?categoryName=${categoryName}&currentPage=${currentPage}&pageSize=${pageSize}&sort=${sort}`;
        return axiosClient.get(url);
    },
    getProductsByCollection(id, currentPage, pageSize, sort) {
        const url = `product/by-collection?id=${id}&currentPage=${currentPage}&pageSize=${pageSize}&sort=${sort}`;
        return axiosClient.get(url);
    },
};

export default productServices;
