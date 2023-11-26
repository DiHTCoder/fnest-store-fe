import React from 'react';
import { useSelector } from 'react-redux';
import { FavouriteItem } from '../components';
import { useDispatch } from 'react-redux';
import image from '../assets/cart/gio-hang-trong.jpg';
import { clearFavourite } from '../features/favourite/favouriteSlice';

const FavouriteList = () => {
    const favourite = useSelector((state) => state.favourite);
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(clearFavourite());
    };
    return (
        <div className="card p-8 bg-base-100 shadow-sm mx-2">
            {favourite.favouriteItems.length === 0 ? (
                <>
                    <div className="flex flex-col items-center py-10">
                        <img src={image} alt="" />
                        <p className="text-xl font-bold">Không có sản phẩm yêu thích!</p>
                        <p className="">Hãy lựa chọn các sản phẩm bạn yêu thích nhé!</p>
                    </div>
                </>
            ) : (
                <>
                    {favourite.favouriteItems.map((favouriteItem) => (
                        <FavouriteItem item={favouriteItem} key={favouriteItem.id} />
                    ))}
                    <div className="grid grid-cols-2 space-x-4">
                        <button className="btn btn-outline btn-info">Khám phá ngay</button>
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={() => {
                                handleDeleteAll();
                            }}
                        >
                            Xóa tất cả
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FavouriteList;
