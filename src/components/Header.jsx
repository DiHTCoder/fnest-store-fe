import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutSuccess } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo1.png';
import { BsCart3 } from 'react-icons/bs';
import { NavLinks } from '.';
import { FaBarsStaggered } from 'react-icons/fa6';
import { BsHeart } from 'react-icons/bs';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const HEADER_TRANSPARENT_DISTANCE = 250;
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleLogout = () => {
        dispatch(logOutSuccess());
        navigate('/');
    };

    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <header
            className="sticky transition-all ease-in left-0 right-0 top-0 z-30 flex h-[64px] items-center justify-center bg-base-100 bg-opacity-90 backdrop-blur text-base-content  md:h-[74px] lg:h-[88px]
            duration-100 [transform:translate3d(0,0,0)] shadow"
        >
            <div className="navbar hidden h-full max-w-screen-xl px-4 py-2 md:flex lg:py-3">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <FaBarsStaggered className="h-6 w-6" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
                            ></ul>
                        </div>
                        <NavLink to="/" className="w-[200px]">
                            <img src={Logo} alt="" />
                        </NavLink>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex align-center justify-center">
                            <NavLinks />
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
                            <div className="indicator">
                                <BsHeart className="h-8 w-8" />
                                <span className="badge badge-sm badge-primary indicator-item text-white">0</span>
                            </div>
                        </NavLink>
                        <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
                            <div className="indicator">
                                <BsCart3 className="h-8 w-8" />
                                <span className="badge badge-sm badge-primary indicator-item text-white">
                                    {cartTotalQuantity}
                                </span>
                            </div>
                        </NavLink>
                        {user ? (
                            <div className="dropdown dropdown-hover mx-4">
                                <label tabIndex={0} className="flex justify-center items-center space-x-1 ">
                                    <div className="avatar online">
                                        <div className="w-10 rounded-full">
                                            <img src="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg" />
                                        </div>
                                    </div>
                                    <h1 className="font-bold">Hi, {user?.username}</h1>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[2] menu shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <NavLink to="/profile">Quản lý tài khoản</NavLink>
                                    </li>
                                    <li>
                                        <a>Đơn mua</a>
                                    </li>
                                    <li>
                                        <p onClick={handleLogout}>Đăng xuất</p>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex font-bold">
                                <NavLink to="/login" className="btn btn-ghost flex space-x-1 bg-info text-white mx-4">
                                    <span>Đăng nhâp/Đăng ký</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
