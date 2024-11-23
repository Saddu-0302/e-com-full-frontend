import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, { payload }) => {
            state.cart = [...state.cart, payload]
        },
        emptyCart: (state, { payload }) => {
            state.cart = []
        },
        removeFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(item => item._id !== payload)
        },
        // addQty: (state, { payload }) => {
        //     state.cart[payload].qty = state.cart[payload].qty + 1
        // },
        // reduceQty: (state, { payload }) => {
        //     state.cart[payload].qty = state.cart[payload].qty - 1
        // },

    },
    extraReducers: builder => builder

})

export const {
    addToCart,
    emptyCart,
    removeFromCart,
    // addQty,
    // reduceQty,
    addAddress
} = userSlice.actions
export default userSlice.reducer