import { createSlice } from '@reduxjs/toolkit';

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        currentRoom: '',
        selectedRoom: null,
    },
    reducers: {
        setRoomsList: (state, action) => {
            state.currentRoom = action.payload;
        },
        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
    },
});

export const { setRoomsList, setSelectedRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
