import axiosClient from '../utils/axiosClient';

const userServices = {
    login(username, password) {
        const url = '/auth/login';
        return axiosClient.post(url, { username, password });
    },
};

export default userServices;
