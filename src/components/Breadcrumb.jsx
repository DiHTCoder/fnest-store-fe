import React from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo bạn đã import Link từ react-router-dom

const Breadcrumb = ({ url, page }) => {
    const toUrl = url.startsWith('/');

    return (
        <div className="text-sm pb-6 breadcrumbs flex justify-center">
            <ul>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li>
                    <Link to={toUrl}>{page}</Link>
                </li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
