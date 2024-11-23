import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";


const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        email: JSON.parse(localStorage.getItem("email")),
        user: JSON.parse(localStorage.getItem("user"))
    },
    reducers: {
        UserLogin: (state, { payload }) => {
            state.user = payload
        },
        handleUserLogout: (state, { payload }) => {
            state.user = null
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.email = payload
        })
        .addMatcher(authApi.endpoints.continueWithGoogle.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        .addMatcher(authApi.endpoints.verifyOTP.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
})

export const { UserLogin, handleUserLogout } = authSlice.actions
export default authSlice.reducer