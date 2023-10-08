import { FaLocationDot } from 'react-icons/fa6';
import { BsFillHouseHeartFill, BsPersonFill, BsHeadset } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <header className="grid grid-cols-2 align-element">
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
                <NavLink to="/login" className="flex items-center space-x-2">
                    <span>Đăng nhập/Đăng ký</span>
                    <BsPersonFill className="w-[20px] h-[20px] text-info" />
                </NavLink>
            </div>
        </header>
    );
};
export default Header;
