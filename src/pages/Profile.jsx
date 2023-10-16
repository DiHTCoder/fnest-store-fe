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
    const userLogin = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!userLogin) {
            navigate('/login');
        }
        if (userLogin?.accessToken) {
            const getUserProfile = async () => {
                try {
                    const resp = await userServices.getProfile(userLogin.accessToken);
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
        <div className="grid grid-cols-4 my-5">
            <NavProfile />
            <div className="card col-span-3 bg-white shadow-lg">
                <div className="mx-4 my-4">
                    <div className="border-b-2 pb-5">
                        <div className="text-lg font-bold">Hồ Sơ Của Tôi</div>
                        <div className="text-bold font-light text-primary">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </div>
                    </div>
                    <div className="mx-20 my-5">
                        <div className="grid grid-cols-5 space-x-3">
                            <div>
                                <h2 className="py-2">Tên đăng nhập</h2>
                                <h2 className="py-2">Email</h2>
                                <h2 className="py-2">Xác nhận email</h2>
                                <h2 className="py-2">Tên</h2>
                                <h2 className="py-2">Số điện thoại</h2>
                                <h2 className="py-2">Giới tính</h2>
                                <h2 className="py-2">Ngày sinh</h2>
                            </div>
                            <div className="col-span-2 font-bold">
                                <h2 className="py-2">{user?.username}</h2>
                                <div className="flex">
                                    <h2 className="py-2">{user?.email}</h2>
                                </div>
                                <div className="py-1">
                                    {user?.emailConfirmed ? (
                                        <BsCheck2Circle className="text-green w-8 h-8" />
                                    ) : (
                                        <div className="flex py-2 space-x-2">
                                            <h2>Vui lòng xác nhận !</h2>
                                            <NavLink
                                                to="/verify-email"
                                                className="underline decoration-solid text-primary"
                                            >
                                                Xác nhận
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                                <h2 className="py-2">{user?.fullName}</h2>
                                <h2 className="py-2">012346767</h2>
                                <h2 className="py-2">{user?.gender}</h2>
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
