import { FaLocationDot } from 'react-icons/fa6';
import { BsFillHouseHeartFill, BsPersonFill, BsHeadset } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <header className="grid grid-cols-2 align-element pt-1">
            <div className="flex space-x-5">
                <NavLink>
                    <span className="">Khuyến mãi</span>
                </NavLink>
                <NavLink>
                    <span className="text-secondary">Giảm giá đặc biệt</span>
                </NavLink>
                <NavLink>
                    <span>Giới thiệu</span>
                </NavLink>
            </div>
            <div className="flex justify-center sm:justify-end items-center space-x-5">
                <NavLink to="/">
                    <BsHeadset className="w-[20px] h-[20px] text-info" />
                </NavLink>
                <NavLink to="/map">
                    <FaLocationDot className="w-[20px] h-[20px] text-info" />
                </NavLink>
                <NavLink to="/map">
                    <BsFillHouseHeartFill className="w-[20px] h-[20px] text-info" />
                </NavLink>
                {user ? (
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="flex justify-center items-center space-x-1 ">
                            <div className="avatar online">
                                <div className="w-10 rounded-full">
                                    <img src="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg" />
                                </div>
                            </div>
                            <h1 className="font-bold">Hi, {user.user.username}</h1>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[2] menu shadow bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to="/profile">Quản lý tài khoản</NavLink>
                            </li>
                            <li>
                                <a>Đơn mua</a>
                            </li>
                            <li>
                                <a>Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex space-x-1 text-info font-bold">
                        <NavLink to="/login" className="flex space-x-1">
                            <span>Đăng nhâp</span>
                        </NavLink>
                        <div>|</div>
                        <NavLink to="/register" className="flex space-x-1">
                            <span>Tạo tài khoản</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;
