import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileSuccess } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userServices from '../services/userServices';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser, BiSolidBellRing } from 'react-icons/bi';
import { PiNewspaperClippingThin } from 'react-icons/pi';
import { BsCashStack, BsCheck } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

const NavProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isListVisible, setIsListVisible] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userProfile = useSelector((state) => state.auth.profile?.user);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (user?.accessToken) {
            const getUserProfile = async () => {
                try {
                    const resp = await userServices.getProfile(user.accessToken);
                    dispatch(getProfileSuccess(resp.data));
                } catch (error) {}
            };
            getUserProfile();
        }
    }, []);
    return (
        <div className="my-2">
            <div className="pb-6 border-b-2">
                <label tabIndex={0} className="flex  items-center space-x-3">
                    <div className="avatar online">
                        <div className="w-14 rounded-full">
                            <img src="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold">Hi, {userProfile?.username}</h1>
                        <div className="flex items-center space-x-2">
                            <AiOutlineEdit />
                            <NavLink className="" to="/update-profile">
                                Sửa hồ sơ
                            </NavLink>
                        </div>
                    </div>
                </label>
            </div>
            <div className="my-5">
                <div className="flex items-center space-x-2 py-2" onClick={() => setIsListVisible(!isListVisible)}>
                    <BiUser className="text-primary" />
                    <span>Tài khoản của tôi</span>
                </div>
                <div className="pl-6">
                    <ul className={isListVisible ? 'block' : 'hidden'}>
                        <li className="py-1 flex items-center">
                            <BsCheck className="text-green" />
                            Ngân Hàng
                        </li>
                        <li className="py-1 flex items-center">
                            <BsCheck className="text-green" />
                            <NavLink to="/address">Địa Chỉ</NavLink>
                        </li>
                        <li className="py-1 flex items-center">
                            <BsCheck className="text-green" />
                            <NavLink to="/change-password">Đổi Mật Khẩu</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-2 pb-2">
                    <PiNewspaperClippingThin className="text-primary" />
                    <span>Đơn mua</span>
                </div>
                <div className="flex items-center space-x-2 pb-2">
                    <BiSolidBellRing className="text-primary" />
                    <span>Thông báo</span>
                </div>
                <div className="flex items-center space-x-2 pb-2">
                    <BsCashStack className="text-primary" />
                    <span>Voucher</span>
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
