import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/adminApi";
import { authApi } from "./apis/authApi";
import authSlice from "./slices/authSlice";
import { publicApi } from "./apis/publicApi";
import userSlice from "./slices/userSlice";
import { userApi } from "./apis/userApi";


const reduxStore = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [publicApi.reducerPath]: publicApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice,
        user: userSlice
    },
    middleware: def => [...def(),
    adminApi.middleware,
    authApi.middleware,
    publicApi.middleware,
    userApi.middleware
    ]
})

export default reduxStore