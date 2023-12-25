import React from 'react';
import { FavouriteList, Breadcrumb } from '../components';
import { useEffect } from 'react';

const Favourite = () => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);
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
