import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { id: 1, url: '/', text: 'Trang chủ' },
    { id: 2, url: 'about', text: 'Về chúng tôi' },
    { id: 3, url: 'products', text: 'Sản phẩm' },
    { id: 4, url: 'cart', text: 'Giỏ hàng' },
    { id: 5, url: 'checkout', text: 'Thanh toán' },
    { id: 6, url: 'orders', text: 'Đơn hàng' },
];

const NavLinks = () => {
    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                if (url === 'checkout' || url === 'orders') return null;
                return (
                    <li key={id}>
                        <NavLink className="capitaslize" to={url}>
                            {text}
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
