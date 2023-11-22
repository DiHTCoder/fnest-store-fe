import { createSlice } from '@reduxjs/toolkit';

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: {
        currentCollection: '',
        selectedCollection: null,
    },
    reducers: {
        setCollectionsList: (state, action) => {
            state.currentCollection = action.payload;
        },
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
        },
    },
});

export const { setCollectionsList, setSelectedCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
