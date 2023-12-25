import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const defaultState = {
    favouriteItems: [],
    favouriteTotalQuantity: 0,
};

const getFavouriteFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favouriteItems')) || defaultState;
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: getFavouriteFromLocalStorage,
    reducers: {
        addItemToFavourite: (state, action) => {
            const existingIndex = state.favouriteItems.findIndex((item) => item.id === action.payload.id);
            if (existingIndex >= 0) {
                toast.info('Sản phẩm đã có trong whishlist!');
            } else {
                let tempProductItem = { ...action.payload, favouriteTotalQuantity: 1 };
                state.favouriteItems.push(tempProductItem);
                toast.success('Đã thêm vào mục yêu thích!');
            }
            localStorage.setItem('favouriteItems', JSON.stringify(state.favouriteItems));
        },
        removeFromFavourite(state, action) {
            state.favouriteItems.map((favouriteItem) => {
                if (favouriteItem.id === action.payload.id) {
                    const nextfavouriteItems = state.favouriteItems.filter((item) => item.id !== favouriteItem.id);

                    state.favouriteItems = nextfavouriteItems;
                    toast.success('Xóa sản phẩm thành công');
                }
                localStorage.setItem('favouriteItems', JSON.stringify(state.favouriteItems));
                return state;
            });
        },

        clearFavourite(state, action) {
            state.favouriteItems = [];
            localStorage.setItem('favouriteItems', JSON.stringify(state.favouriteItems));
            toast.success('Xóa thành công!');
        },
    },
});

export const { addItemToFavourite, removeFromFavourite, clearFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
