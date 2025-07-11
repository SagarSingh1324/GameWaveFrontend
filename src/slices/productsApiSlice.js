import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
        query: ({ categoryList = [], brandList = [], keyword = '', pageNumber = 1 } = {}) => {
            const params = new URLSearchParams();

            brandList.forEach((b) => params.append('brand', b));
            categoryList.forEach((c) => params.append('category', c));
            if (keyword) params.append('keyword', keyword);
            params.append('pageNumber', pageNumber.toString());

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
        getTopProducts: builder.query({
        query: () => `${PRODUCTS_URL}/top`,
        keepUnusedDataFor: 5,
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery,   
    useGetTopProductsQuery, 
} = productsApiSlice;
