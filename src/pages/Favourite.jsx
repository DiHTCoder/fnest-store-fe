import React from 'react';
import { useSelector } from 'react-redux';
import { FavouriteList, Breadcrumb } from '../components';

const Favourite = () => {
    return (
        <>
            <Breadcrumb url="favourite" page="Sản phẩm yêu thích" />
            <div className="lg:col-span-8">
                <FavouriteList />
            </div>
        </>
    );
};

export default Favourite;
