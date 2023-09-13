import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { id: 1, url: '/', text: 'Trang chủ' },
    { id: 2, url: 'products', text: 'Sản phẩm' },
    { id: 3, url: 'about', text: 'Về chúng tôi' },
    { id: 4, url: 'cart', text: 'Giỏ hàng' },
    { id: 5, url: 'checkout', text: 'Thanh toán' },
    { id: 6, url: 'orders', text: 'Đơn hàng' },
    { id: 7, url: 'creative', text: 'Góc sáng tạo' },
];

const NavLinks = () => {
    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                if (url === 'checkout' || url === 'orders' || url === 'cart')
                    return null;
                return (
                    <li key={id}>
                        <NavLink
                            className="btn btn-ghost hover:bg-slate-100"
                            to={url}
                        >
                            {text}
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
