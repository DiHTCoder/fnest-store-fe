import React from 'react';
import Logo from '../assets/logo.svg';
import { BsCart3 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { NavLinks } from '.';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';

const Navbar = () => {
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
            <nav
                className={`sticky left-0 right-0 top-0 z-50 flex h-[64px] items-center justify-center text-slate-800 transition-all ease-in md:h-[74px] lg:h-[88px]
        ${scrollY < HEADER_TRANSPARENT_DISTANCE ? 'bg-transparent text-white' : 'bg-white text-gray-800 shadow'}`}
            >
                <div className="navbar container hidden h-full max-w-screen-xl items-center justify-between px-4 py-2 md:flex lg:py-3">
                    <div className="navbar-start">
                        {/* DROPDOWN */}
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <FaBarsStaggered className="h-6 w-6" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
                            ></ul>
                        </div>
                        <NavLink to="/">
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
                                <span className="badge badge-sm badge-primary indicator-item text-white">0</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="border-[0.5px]"></div>
            </nav>
        </>
    );
};

export default Navbar;
