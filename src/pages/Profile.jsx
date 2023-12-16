import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userServices from '../services/userServices';
import { useEffect } from 'react';
import { NavProfile } from '../components';
import { formatDate } from '../utils/helpers';
import { BsCheck2Circle } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.login?.token);
    useEffect(() => {
        scrollTo(0, 0);
        if (!token) {
            navigate('/login');
        }
        if (token) {
            const getUserProfile = async () => {
                try {
                    const resp = await userServices.getProfile(token);
                    dispatch(getProfileSuccess(resp.data));
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.messages) {
                        const errorMessages = error.response.data.messages;
                        toast.error(errorMessages.join(', ')); // Display error messages from the response
                    } else {
                        toast.error('Có lỗi xảy ra.'); // Fallback error message
                    }
                }
            };
            getUserProfile();
        }
    }, []);
    const user = useSelector((state) => state.auth.profile?.user);
    const date = formatDate(user?.birthday);
    return (
        <div className="grid md:grid-cols-4 gap-2 md:mt-10 lg:mb-30 mb-10">
            <NavProfile />
            <div className="card md:col-span-3 bg-white shadow-lg">
                <div className="m-4">
                    <div className="border-b-2 pb-5 lg:text-lg text-sm">
                        <div className=" font-bold">Hồ Sơ Của Tôi</div>
                        <div className="text-bold">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                    </div>
                    <div className="md:mx-14 mx-2 my-5 lg:text-base text-sm">
                        <div className="grid md:grid-cols-5 grid-cols-2 md:gap-2 gap-1">
                            <div className="flex flex-col">
                                <h2 className="py-2">Tên đăng nhập</h2>
                                <h2 className="py-2">Email</h2>
                                <h2 className="py-2">Trạng thái email</h2>
                                <h2 className="py-2">Họ và Tên</h2>
                                <h2 className="py-2">Ngày sinh</h2>
                            </div>
                            <div className="md:col-span-2 font-bold flex flex-col">
                                <h2 className="py-2">{user?.username}</h2>
                                <div className="flex">
                                    <h2 className="py-2">{user?.email}</h2>
                                </div>
                                <div className="py-2">
                                    {user?.emailConfirmed ? (
                                        <BsCheck2Circle className="text-success w-8 h-8" />
                                    ) : (
                                        <NavLink to="/verify-email" className="underline decoration-solid text-primary">
                                            Xác nhận
                                        </NavLink>
                                    )}
                                </div>
                                <h2 className="py-2">{user?.fullName}</h2>
                                <h2 className="py-2">{date}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Profile;
