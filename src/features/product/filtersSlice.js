import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        sortBy: 'name.asc',
        priceMin: 0,
    },
    reducers: {
        updateFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFilters: (state) => {
            return {
                search: '',
                sortBy: 'name.asc',
                priceMin: 0,
            };
        },
    },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
