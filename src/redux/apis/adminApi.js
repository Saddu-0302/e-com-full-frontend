import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`,
        credentials: "include"
    }),
    tagTypes: ["user", "product", "order"],
    endpoints: (builder) => {
        return {
            // product
            adminGetAllProducts: builder.query({
                query: () => {
                    return {
                        url: "/products",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["product"]
            }),
            adminAddProduct: builder.mutation({
                query: productData => {
                    return {
                        url: "/add-product",
                        method: "POST",
                        body: productData
                    }
                },
                invalidatesTags: ["product"]
            }),
            adminUpdateProduct: builder.mutation({
                query: productData => {
                    return {
                        url: `/update-product/${productData._updateId}`,
                        method: "PUT",
                        body: productData
                    }
                },
                invalidatesTags: ["product"]
            }),
            adminDeleteProduct: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-product/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["product"]
            }),
            deActivateProduct: builder.mutation({
                query: productData => {
                    return {
                        url: `/deactivate-product/${productData._id}`,
                        method: "PUT",
                        body: productData
                    }
                },
                invalidatesTags: ["product"]
            }),
            activateProduct: builder.mutation({
                query: productData => {
                    return {
                        url: `/activate-product/${productData._id}`,
                        method: "PUT",
                        body: productData
                    }
                },
                invalidatesTags: ["product"]
            }),
            getProductDetails: builder.query({
                query: (productData) => {
                    return {
                        url: `/product-details/${productData._id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["product"]
            }),

            // 2 order
            adminGetAllOrder: builder.query({
                query: () => {
                    return {
                        url: "/orders",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["order"]
            }),
            getOrderDetails: builder.query({
                query: (orderData) => {
                    return {
                        url: `/orders-details/${orderData._id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["order"]
            }),
            cancelOrder: builder.mutation({
                query: orderdata => {
                    return {
                        url: `/cancel-order/${orderdata._id}`,
                        method: "PUT",
                        body: productData
                    }
                },
                invalidatesTags: ["order"]
            }),
            updateOrderStatus: builder.mutation({
                query: orderdata => {
                    return {
                        url: `/update-order-status/${orderdata._id}`,
                        method: "PUT",
                        body: orderdata
                    }
                },
                invalidatesTags: ["order"]
            }),

            // 3 user
            getAllUsers: builder.query({
                query: () => {
                    return {
                        url: "/users",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["user"]
            }),
            getUserDetails: builder.query({
                query: userData => {
                    return {
                        url: `/user-details/${userData._id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["user"]
            }),
            blockUsers: builder.mutation({
                query: id => {
                    return {
                        url: `/block-user/${id}`,
                        method: "PUT",
                        // body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            unblockUsers: builder.mutation({
                query: id => {
                    return {
                        url: `/unblock-user/${id}`,
                        method: "PUT",
                        // body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            getUserOrders: builder.query({
                query: userData => {
                    return {
                        url: `/user-order/${userData._id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["user"]
            }),
        }
    }
})

export const {
    useAdminGetAllProductsQuery,
    useAdminAddProductMutation,
    useAdminUpdateProductMutation,
    useAdminDeleteProductMutation,
    useDeActivateProductMutation,
    useActivateProductMutation,
    useGetProductDetailsQuery,

    useAdminGetAllOrderQuery,
    useGetOrderDetailsQuery,
    useCancelOrderMutation,
    useUpdateOrderStatusMutation,

    useGetAllUsersQuery,
    useGetUserDetailsQuery,
    useBlockUsersMutation,
    useUnblockUsersMutation,
    useGetUserOrdersQuery
} = adminApi
