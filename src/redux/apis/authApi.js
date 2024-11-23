import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
        credentials: "include"
    }),

    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            registerAdmin: builder.mutation({
                query: authData => {
                    return {
                        url: "/registerAdmin",
                        method: "POST",
                        body: authData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            loginAdmin: builder.mutation({
                query: authData => {
                    return {
                        url: "/loginAdmin",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            logout: builder.mutation({
                query: authData => {
                    return {
                        url: "/logoutAdmin",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                },
                invalidatesTags: ["auth"]
            }),
            loginUser: builder.mutation({
                query: authData => {
                    return {
                        url: "/customer-login",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("email", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            registerUser: builder.mutation({
                query: authData => {
                    return {
                        url: "/customer-register",
                        method: "POST",
                        body: authData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            continueWithGoogle: builder.mutation({
                query: authData => {
                    return {
                        url: "/continue-with-google",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            verifyOTP: builder.mutation({
                query: authData => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                },
            }),

        }
    }
})

export const {
    useLoginAdminMutation,
    useRegisterAdminMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useContinueWithGoogleMutation,
    useVerifyOTPMutation
} = authApi
