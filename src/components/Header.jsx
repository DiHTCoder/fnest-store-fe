import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom } from '../features/room/roomSilce';
import Logo from '../assets/Logo1.png';
import { NavLinks } from '.';
import { logOutSuccess } from '../features/user/userSlice';
import { FaBarsStaggered } from 'react-icons/fa6';
import avatar from '../assets/images/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { PiArmchairLight } from 'react-icons/pi';
import { LiaWindows } from 'react-icons/lia';
import { FaObjectGroup } from 'react-icons/fa';
import { BsPostcardHeart } from 'react-icons/bs';
import { IoCartOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineLogin } from 'react-icons/ai';

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
                            <div className="drawer drawer-end lg:hidden block md:navbar-start">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content flex justify-end">
                                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                                        <FaBarsStaggered className="h-6 w-6 order-last" />
                                    </label>
                                </div>
                                <div className="drawer-side">
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
                                            <NavLink to="cart">
                                                <IoCartOutline />
                                                Giỏ hàng
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="favourite">
                                                <CiHeart />
                                                Yêu thích
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
            </header>
        </>
    );
};
export default Header;
