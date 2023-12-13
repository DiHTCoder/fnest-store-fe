import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom } from '../features/room/roomSilce';
import Logo from '../assets/Logo1.png';
import { NavLinks } from '.';
import { FaBarsStaggered } from 'react-icons/fa6';

export const Header = () => {
    const dispatch = useDispatch();

    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const HEADER_TRANSPARENT_DISTANCE = 250;
    const [scrollY, setScrollY] = useState(0);
    const rooms = useSelector((state) => state.rooms.currentRoom);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleRoomClick = (id) => {
        dispatch(setSelectedRoom(id));
    };

    return (
        <>
            <header
                className={`sticky transition-all ease-in left-0 right-0 top-0 z-30 flex items-center justify-center bg-base-100 bg-opacity-90 backdrop-blur text-base-content h-[60px] md:h-[74px] lg:h-[80px]
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
                                    <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content">
                                        <li>
                                            <NavLink to="/">Trang chủ</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="products">Sản phẩm</NavLink>
                                        </li>
                                        <li>
                                            <details open>
                                                <summary>Phòng</summary>

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
                                            <NavLink to="collections">Bộ sưu tập</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="posts">Góc sáng tạo</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="login">Đăng nhập/Đăng ký</NavLink>
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
