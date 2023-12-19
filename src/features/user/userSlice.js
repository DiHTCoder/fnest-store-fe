import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            token: null,
            currentUser: null,
            isFetching: false,
            error: false,
            addresses: null,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        profile: {
            user: null,
            error: false,
        },
        update: {
            user: null,
            updated: false,
            error: false,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },

        setToken: (state, action) => {
            // Lưu token trong trạng thái
            state.login.token = action.payload;
        },

        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        getProfileSuccess: (state, action) => {
            state.profile.user = action.payload;
            state.profile.error = false;
        },
        updateProfileSuccess: (state, action) => {
            state.update.user = action.payload;
            state.update.updated = true;
            state.update.error = false;
        },
        logOutSuccess: (state) => {
            state.login.token = null;
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        updateCurrentUser: (state, action) => {
            state.login.currentUser = action.payload;
        },
        getUserAddresses: (state, action) => {
            state.login.addresses = action.payload;
        },
    },
});

export const {
    loginSuccess,
    setToken,
    registerSuccess,
    updateCurrentUser,
    updateProfileSuccess,
    logOutSuccess,
    getProfileSuccess,
    getUserAddresses,
} = userSlice.actions;
export default userSlice.reducer;
