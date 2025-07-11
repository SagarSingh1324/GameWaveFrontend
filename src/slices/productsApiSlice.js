import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ categoryList=[], brandList=[] } = {}) => {
                const params = new URLSearchParams();

                brandList.forEach((b) => params.append("brand", b));
                categoryList.forEach((c) => params.append("category", c));

                return {
                url: `${PRODUCTS_URL}?${params.toString()}`,
                };
            },
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
