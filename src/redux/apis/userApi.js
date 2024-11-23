import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user` }),
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            userGetAllOrder: builder.query({
                query: (id) => {
                    return {
                        url: `/order/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["order"]
            }),
            userPlaceOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/place-order",
                        method: "POST",
                        body: orderData
                    }
                },
                invalidatesTags: ["order"]
            }),
            userCancelOrder: builder.mutation({
                query: id => {
                    return {
                        url: `/order-cancel/${id}`,
                        method: "PUT",
                    }
                },
                invalidatesTags: ["order"]
            }),
        }
    }
})

export const { useLazyUserGetAllOrderQuery, useUserPlaceOrderMutation, useUserCancelOrderMutation } = userApi
