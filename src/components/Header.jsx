import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../assets/Logo1.png';
import { NavLinks } from '.';
import { FaBarsStaggered } from 'react-icons/fa6';

export const Header = () => {
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

    return (
        <>
            <header
                className="sticky transition-all ease-in left-0 right-0 top-0 z-30 flex h-[64px] items-center justify-center bg-base-100 bg-opacity-90 backdrop-blur text-base-content  md:h-[74px] lg:h-[100px]
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
                            <form>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Tìm kiếm..."
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;
