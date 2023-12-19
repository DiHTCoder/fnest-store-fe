import axiosClient from '../utils/axiosClient';

const userServices = {
    login(username, password) {
        const url = '/auth/login';
        return axiosClient.post(url, { username, password });
    },
    register(username, password, fullName, email, gender, birthday) {
        const url = '/auth/register';
        return axiosClient.post(url, { username, password, fullName, email, gender, birthday });
    },
    getProfile(accessToken) {
        const url = '/user/profile';
        return axiosClient.get(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },
    updateProfile(accessToken, fullName, email, gender, birthday) {
        const url = '/buyer/profile';
        return axiosClient.patch(
            url,
            { fullName, email, gender, birthday },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    changePassword(accessToken, oldPassword, newPassword) {
        const url = '/buyer/profile/password';
        return axiosClient.patch(
            url,
            { oldPassword, newPassword },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    getOTP(email) {
        const url = '/otp';
        return axiosClient.post(url, { email });
    },
    getNewPassword(username, otpCode) {
        const url = `/restore-password?username=${username}&otpCode=${otpCode}`;
        return axiosClient.post(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    },
    verifyOTP(accessToken, otpCode) {
        const url = '/buyer/profile/email-confirm';
        return axiosClient.post(
            url,
            { otpCode },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    },
    sendFeedback(fullName, email, content) {
        const url = '/feedback';
        return axiosClient.post(
            url,
            { fullName, email, content },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
    },
};

export default userServices;
