import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const publicApi = createApi({
    reducerPath: "publicApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/public`,
        credentials: "include"
    }),
    tagTypes: ["public"],
    endpoints: (builder) => {
        return {
            GetAllProducts: builder.query({
                query: () => {
                    return {
                        url: "/all-products",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["public"]
            }),
            GetProductDetails: builder.query({
                query: (id) => {
                    return {
                        url: `/product-details/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["public"]
            }),

        }
    }
})

export const {
    useGetAllProductsQuery, useGetProductDetailsQuery } = publicApi
