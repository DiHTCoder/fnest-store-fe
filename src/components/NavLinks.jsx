import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
    const { t } = useTranslation('translation');

    const links = [
        { id: 1, url: '/', text: t('homepage') },
        { id: 2, url: 'products', text: t('products') },
        { id: 3, url: 'about', text: t('about_us') },
        { id: 4, url: 'map', text: t('map') },
        { id: 5, url: 'checkout', text: t('purchase_orders') },
        { id: 6, url: 'orders', text: t('purchase_orders') },
        { id: 7, url: 'creative', text: t('creative') },
    ];

    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link;
                if (url === 'checkout' || url === 'orders' || url === 'cart') return null;
                return (
                    <li key={id}>
                        <NavLink className="btn btn-ghost" to={url}>
                            {text}
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
