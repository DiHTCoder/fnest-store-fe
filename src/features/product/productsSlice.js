import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productsList: { content: [], currentPage: 0, totalPages: 0, isLoading: false },
    },
    reducers: {
        setProductsList: (state, action) => {
            return {
                ...state.productsList,
                content: action.payload.content,
                currentPage: action.payload.page,
                totalPages: action.payload.totalPages,
            };
        },
    },
});

export const { setProductsList } = productsSlice.actions;
export default productsSlice.reducer;
