import axiosClient from '../utils/axiosClient';

const userServices = {
    login(username, password) {
        const url = '/auth/login';
        return axiosClient.post(url, { username, password });
    },
    register(username, password, fullname, email, gender, birthday) {
        const url = '/auth/register';
        return axiosClient.post(url, { username, password, fullname, email, gender, birthday });
    },
};

export default userServices;
