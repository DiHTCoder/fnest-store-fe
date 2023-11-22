import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { logOutSuccess } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import vie from '../assets/flag/vi-flag.png';
import eng from '../assets/flag/en-flag.png';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { CiUser, CiLocationOn, CiHeadphones } from 'react-icons/ci';

const TopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation');

    const user = useSelector((state) => state.auth.login?.currentUser);

    const { cartTotalQuantity } = useSelector((state) => state.cart);
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
        navigate('/');
    };
    return (
        <div className="bg-info border-b-[1px] text-white">
            <section className="flex align-element justify-between items-center ">
                <div className="items-start">
                    <div className="flex items-center">
                        <span className="text-sm uppercase font-bold">{currentLanguage}</span>
                        <div className="btn btn-ghost btn-circle btn-sm" onClick={changeLanguage}>
                            <div className="indicator">
                                <img src={flagImage} alt="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="ml-4">
                            {/* THEME SETUP */}
                            <label className="swap swap-rotate">
                                <input type="checkbox" />
                                <BsSunFill className="swap-on h-4 w-4" />
                                <BsMoonFill className="swap-off h-4 w-4" />
                            </label>
                        </div>
                        <div className="ml-4 flex items-center">
                            <CiHeadphones className="w-6 h-6" />
                            <span className="ml-2">0372639623</span>
                        </div>
                    </div>
                </div>
                <div className="items-end">
                    <div className="flex items-center gap-2">
                        <NavLink to="/favourite" className="btn btn-ghost btn-circle btn-md">
                            <div className="indicator">
                                <CiLocationOn className="h-8 w-8" />
                            </div>
                        </NavLink>
                        <NavLink to="/favourite" className="btn btn-ghost btn-circle btn-md">
                            <div className="indicator">
                                <BsHeart className="h-6 w-6" />
                            </div>
                        </NavLink>
                        <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ">
                            <div className="indicator">
                                <BsCart3 className="h-6 w-6" />
                                <span className="badge badge-sm badge-primary indicator-item text-white">
                                    {cartTotalQuantity}
                                </span>
                            </div>
                        </NavLink>

                        {user ? (
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="flex justify-center items-center space-x-1 ">
                                    <div className="avatar online">
                                        <div className="w-10 rounded-full">
                                            <img src="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg" />
                                        </div>
                                    </div>
                                    <h1 className="font-bold">Hi,{user?.username}</h1>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[100] menu shadow bg-base-100 rounded-box w-52 "
                                >
                                    <li>
                                        <NavLink to="/profile">{t('profile')}</NavLink>
                                    </li>
                                    <li>
                                        <a>{t('purchase_orders')}</a>
                                    </li>
                                    <li>
                                        <p onClick={handleLogout}>{t('logout')}</p>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex ">
                                <NavLink to="/login" className="flex space-x-1 items-center justify-center">
                                    <CiUser className="w-6 h-6" /> <span>{t('login_register')}</span>
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
