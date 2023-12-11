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
    getAllProductReviews(productName, currentPage, pageSize) {
        const url = `/product-review/by-product?productName=${productName}&currentPage=${currentPage}&pageSize=${pageSize}`;
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
    applyCouponCode(orderTotal, code) {
        const url = `/coupon-code/apply?orderTotal=${orderTotal}&code=${code}`;
        return axiosClient.post(url);
    },
    reviewProduct(accessToken, orderItemId, content, point) {
        const url = '/buyer/product-review';
        return axiosClient.post(
            url,
            { orderItemId, content, point },
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

export default productServices;
