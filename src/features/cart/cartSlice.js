import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cartItems')) || defaultState;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),
    reducers: {
        addItemToCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                };
                toast.info('Số lượng sản phẩm đã được cập nhật!');
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info('Số lượng sản phẩm đã được cập nhật!');
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

                state.cartItems = nextCartItems;

                toast.error('Sản phẩm đã được xóa!');
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter((item) => item.id !== cartItem.id);

                    state.cartItems = nextCartItems;
                    toast.success('Xóa sản phẩm thành công');
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                return state;
            });
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                },
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.success('Xóa thành công!');
        },
    },
});

export const { addItemToCart, decreaseCart, removeFromCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
