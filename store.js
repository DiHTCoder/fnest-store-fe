import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './src/features/user/userSlice';
import cartReducer from './src/features/cart/cartSlice';
import addressReduce from './src/features/address/addressSlice';
import favouriteReducer from './src/features/favourite/favouriteSlice';
import productReducer from './src/features/product/productsSlice';
import roomReducer from './src/features/room/roomSilce';
import collectionReducer from './src/features/collection/collectionsSlice';
import filtersReducer from './src/features/product/filtersSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: userReducer,
    address: addressReduce,
    cart: cartReducer,
    favourite: favouriteReducer,
    products: productReducer,
    rooms: roomReducer,
    filters: filtersReducer,
    collections: collectionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
