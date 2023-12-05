import axiosClient from '../utils/axiosClient';

const newServices = {
    getAllNews(currentPage, pageSize) {
        const url = `/post?currentPage=${currentPage}&pageSize=${pageSize}`;
        return axiosClient.get(url);
    },
};

export default newServices;
