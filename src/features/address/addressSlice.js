import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        province: {
            province: null,
        },
    },
    reducers: {
        getProvinces: (state, action) => {
            state.province = action.payload;
        },
    },
});

export const { getProvinces } = addressSlice.actions;

export default addressSlice.reducer;
