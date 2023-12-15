import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfileSuccess } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import userServices from '../services/userServices';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser, BiSolidBellRing } from 'react-icons/bi';
import { PiNewspaperClippingThin } from 'react-icons/pi';
import { BsCashStack, BsCheck } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import avatar from '../assets/images/avatar.jpg';

const NavProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isListVisible, setIsListVisible] = useState(true);
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
        <div className="my-2 lg:mx-0 mx-4 lg:text-base text-sm">
            <Link to="/profile" className="pb-6 border-b-2 hover:cursor-pointer">
                <label tabIndex={0} className="flex items-center space-x-3">
                    <div className="avatar online">
                        <div className="w-14 rounded-full">
                            <img src={avatar} />
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
            </Link>
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
                <NavLink to="/orders" className="flex items-center space-x-2 pb-2">
                    <PiNewspaperClippingThin className="text-primary" />
                    <span>Đơn mua</span>
                </NavLink>
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
