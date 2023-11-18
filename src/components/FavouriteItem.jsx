import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice, generateAmountOptions } from '../utils/helpers';
import { CiCircleRemove, CiCirclePlus } from 'react-icons/ci';
import { removeFromFavourite } from '../features/favourite/favouriteSlice';
import { addItemToCart } from '../features/cart/cartSlice';

const FavouriteItem = ({ item }) => {
    const dispatch = useDispatch();
    const removeItemFromTheFavourite = (item) => {
        dispatch(removeFromFavourite(item));
    };
    const addItemToTheCart = (item) => {
        dispatch(addItemToCart(item));
    };
    return (
        <div className="flex space-x-3 w-full mb-10 border-b border-base-300 pb-6 last:border-b-0">
            <img src={item.thumbnail} alt={item.name} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                    <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <div className="mt-2">
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 flex-col-reverse">
                        <div className="text-2xl text-secondary font-semibold">{formatPrice(item.price)}</div>
                        <div className="text-sm">Giá: {formatPrice(item.price)}</div>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <button className="btn btn-ghost" onClick={() => addItemToTheCart(item)}>
                        Thêm vào giỏ hàng
                        <CiCirclePlus className="w-[30px] h-[30px]" />
                    </button>
                    <button className="btn btn-ghost" onClick={() => removeItemFromTheFavourite(item)}>
                        Xóa
                        <CiCircleRemove className="w-[30px] h-[30px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavouriteItem;
