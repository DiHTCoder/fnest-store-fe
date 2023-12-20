import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutSuccess } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import vie from '../assets/flag/vi-flag.png';
import eng from '../assets/flag/en-flag.png';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { CiUser, CiHeadphones } from 'react-icons/ci';
import avatar from '../assets/images/avatar.jpg';
import { toast } from 'react-toastify';
import { MdOutlineDiscount } from 'react-icons/md';

const TopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation');

    const user = useSelector((state) => state.auth.login?.currentUser);

    const [currentLanguage, setCurrentLanguage] = useState('vie');
    const [flagImage, setFlagImage] = useState(vie);

    const changeLanguage = () => {
        const newLanguage = currentLanguage === 'eng' ? 'vie' : 'eng';
        setCurrentLanguage(newLanguage);
        setFlagImage(newLanguage === 'eng' ? eng : vie);
        i18n.changeLanguage(newLanguage);
    };

    const handleLogout = () => {
        dispatch(logOutSuccess());
        toast.success('Đăng xuất tài khoản thành công!');
        navigate('/');
    };
    return (
        <div className="bg-[#303036] border-b-[1px] hidden md:block text-sm lg:text-base">
            <section className="flex align-element justify-between items-center">
                <div className="items-start text-white">
                    <div className="flex items-center">
                        <span className="uppercase font-bold">{currentLanguage}</span>
                        <div className="btn btn-ghost btn-circle btn-sm" onClick={changeLanguage}>
                            <div className="indicator">
                                <img src={flagImage} alt="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="ml-4 flex items-center">
                            <MdOutlineDiscount className="w-6 h-6" />
                            <NavLink to="discounts" className="ml-2">
                                Mã giảm giá
                            </NavLink>
                        </div>
                        <div className="ml-4 flex items-center">
                            <CiHeadphones className="w-6 h-6" />
                            <span className="ml-2">0372639623</span>
                        </div>
                    </div>
                </div>
                <div className="items-end ">
                    <div className="flex items-center gap-2 my-1">
                        {user ? (
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="flex justify-center items-center space-x-1 ">
                                    <div className="avatar online">
                                        <div className="w-10 rounded-full">
                                            <img src={avatar} />
                                        </div>
                                    </div>
                                    <h1 className="font-bold text-white">Hi,{user?.username}</h1>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[100] menu shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <NavLink to="/profile">{t('profile')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/orders">{t('purchase_orders')}</NavLink>
                                    </li>
                                    <li>
                                        <p onClick={handleLogout}>{t('logout')}</p>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="my-2">
                                <NavLink to="/login" className="flex gap-1 items-center justify-center text-white">
                                    <CiUser className="w-6 h-6" /> <button>{t('login_register')}</button>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TopHeader;
