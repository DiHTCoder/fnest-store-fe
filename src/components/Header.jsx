import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom } from '../features/room/roomSilce';
import Logo from '../assets/Logo1.png';
import { NavLinks } from '.';
import { BsHeart } from 'react-icons/bs';
import { logOutSuccess } from '../features/user/userSlice';
import { FaBarsStaggered } from 'react-icons/fa6';
import avatar from '../assets/images/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { PiArmchairLight } from 'react-icons/pi';
import { LiaWindows } from 'react-icons/lia';
import { FaObjectGroup } from 'react-icons/fa';
import { BsPostcardHeart } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const HEADER_TRANSPARENT_DISTANCE = 250;
    const [scrollY, setScrollY] = useState(0);
    const rooms = useSelector((state) => state.rooms.currentRoom);
    const user = useSelector((state) => state.auth.login?.currentUser);

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

    const handleRoomClick = (id) => {
        dispatch(setSelectedRoom(id));
    };

    return (
        <>
            <header
                className={`sticky transition-all ease-in left-0 right-0 top-0 z-30 flex items-center justify-center bg-base-100 bg-opacity-90 backdrop-blur text-base-content h-[64px] md:h-[74px] lg:h-[80px]
        duration-100 [transform:translate3d(0,0,0)] shadow ${
            scrollY > HEADER_TRANSPARENT_DISTANCE ? 'bg-base-200' : ''
        }`}
            >
                <div className="navbar max-w-screen-xl px-4 py-2 flex lg:py-3">
                    <div className="navbar">
                        <div className="navbar-start ">
                            <NavLink to="/" className="w-[200px]">
                                <img src={Logo} alt="" />
                            </NavLink>
                        </div>
                        <div className="lg:navbar-center hidden lg:flex">
                            <ul className="flex align-center justify-center">
                                <NavLinks />
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className="flex items-center gap-1">
                                <NavLink to="/favourite" className="btn btn-ghost btn-circle md:btn-md btn-sm">
                                    <div className="indicator">
                                        <BsHeart className="md:h-6 md:w-6 w-5 h-5" />
                                    </div>
                                </NavLink>

                                <NavLink to="/cart" className="btn btn-ghost btn-circle md:btn-md btn-sm ">
                                    <div className="indicator">
                                        <BsCart3 className="md:h-6 md:w-6 w-5 h-5" />
                                        {cartTotalQuantity > 0 ? (
                                            <>
                                                <span className="badge badge-sm badge-primary indicator-item text-white">
                                                    {cartTotalQuantity}
                                                </span>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </NavLink>
                                <div className="drawer drawer-end lg:hidden block md:navbar-start">
                                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                    <div className="drawer-content flex justify-end">
                                        <label
                                            htmlFor="my-drawer"
                                            className="btn btn-ghost drawer-button md:btn-md btn-sm"
                                        >
                                            <FaBarsStaggered className="md:h-6 md:w-6 w-5 h-5 order-last" />
                                        </label>
                                    </div>
                                    <div className="drawer-side" style={{ zIndex: 1000 }}>
                                        <label
                                            htmlFor="my-drawer"
                                            aria-label="close sidebar"
                                            className="drawer-overlay"
                                        ></label>
                                        <ul className="menu p-4 w-1/2 min-h-full bg-base-200 text-base-content">
                                            <>
                                                {user && (
                                                    <NavLink
                                                        to="profile"
                                                        className="w-10 rounded-full flex items-center gap-2 my-2"
                                                    >
                                                        <img src={avatar} />
                                                        <h1 className="font-bold text-sm">Hi,{user?.fullName}</h1>
                                                    </NavLink>
                                                )}
                                            </>
                                            <li>
                                                <NavLink to="/">
                                                    <IoHomeOutline />
                                                    Trang chủ
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="products">
                                                    <PiArmchairLight />
                                                    Sản phẩm
                                                </NavLink>
                                            </li>
                                            <li>
                                                <details open>
                                                    <summary>
                                                        <LiaWindows />
                                                        Phòng
                                                    </summary>

                                                    <ul>
                                                        {rooms ? (
                                                            rooms.map((room) => (
                                                                <li key={room.id}>
                                                                    <NavLink
                                                                        to={`/rooms/${room.id}`}
                                                                        onClick={() => handleRoomClick(room.id)}
                                                                    >
                                                                        {room.name}
                                                                    </NavLink>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <NavLink to="collections">
                                                    <FaObjectGroup />
                                                    Bộ sưu tập
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="posts">
                                                    <BsPostcardHeart />
                                                    Góc sáng tạo
                                                </NavLink>
                                            </li>

                                            <li>
                                                {!user ? (
                                                    <NavLink to="login">
                                                        <AiOutlineLogin />
                                                        Đăng nhập
                                                    </NavLink>
                                                ) : (
                                                    <p onClick={handleLogout}>
                                                        <AiOutlineLogout />
                                                        Đăng xuất
                                                    </p>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;
