import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    shipping: 0,
    discountCode: null,
    discount: 0,
};

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cartItems')) || defaultState;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage,
    reducers: {
        addItemToCart: (state, action) => {
            // Ensure action.payload is defined
            if (action.payload) {
                const cartQuantity = action.payload.quantity !== undefined ? action.payload.quantity : 1;
                const item = state.cartItems.find((i) => i.id === action.payload.id);

                if (item) {
                    item.cartQuantity += cartQuantity;
                    toast.info('Số lượng sản phẩm đã được cập nhật!');
                } else {
                    const tempProductItem = { ...action.payload, cartQuantity: cartQuantity };
                    state.cartItems.push(tempProductItem);
                    toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
                }

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems = state.cartItems.map((item) =>
                    item.id === action.payload.id ? { ...item, cartQuantity: item.cartQuantity - 1 } : item,
                );
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
                    const { onSale, price, salePrice, cartQuantity } = cartItem;
                    let itemTotal = 0;
                    if (onSale) {
                        itemTotal = salePrice * cartQuantity;
                    } else {
                        itemTotal = price * cartQuantity;
                    }
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
            state.shipping = 0;
            state.discountCode = null;
            state.discount = 0;
        },
        setOrderTotal(state, action) {
            state.cartTotalAmount = action.payload.total;
            state.shipping = action.payload.shipping_charge;
        },
        applyDiscountCode: (state, action) => {
            state.discountCode = action.payload.couponCode;
            state.discount = action.payload.discount;

            if (state.discount > 0) {
                state.cartTotalAmount -= state.discount;
                state.cartTotalAmount = Math.max(0, state.cartTotalAmount);
            }
        },
        clearDiscountCode: (state) => {
            state.discountCode = '';
            state.discount = '';
        },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

export const { addItemToCart, applyDiscountCode, setOrderTotal, decreaseCart, removeFromCart, clearCart, getTotals } =
    cartSlice.actions;
export default cartSlice.reducer;
