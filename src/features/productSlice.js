import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, ITEMS } from './../api/endpoints.js';
import convertToFormData from './../utils/convertToFormData.js';
import getCookie from './../utils/getCookie.js';
import { longCacheTime, shortCacheTime } from './../config/constants';



const transformProductData = (data) => {
    return {
        Id: data.ProID,
        NameAr: data.Pro_AR_Name,
        NameEn: data.Pro_EN_Name,
        Father: data.CategoryAr,
        CatID: data.CatID,
        Tag: data.Tag,
        Question1: data.Question1,
        Question2: data.Question2,
        Question3: data.Question3,
        Question4: data.Question4,
        Question5: data.Question5,
        Compo: data.Compo,
        ForeColor: data.ForeColor,
        BackColor: data.BackColor,
        PreparationTime: data.PreparationTime,
        ImgPath: data.ImgPath,
        Printer: data.Printer,
        Printer2: data.Printer2,
        Barcode: data.Barcode,
        Price: data.Price,
        Price2: data.Price2,
        Price3: data.Price3,
        Price4: data.Price4,
        Warehouse: data.TagDesc,
        UnitID: data.UnitID,
        TaxPercentage: data.TaxPercentage,
        Discountable: data.Discountable,
        IsService: data.IsService,
        IsActive: data.IsActive,
        Saleable: data.Saleable,
        Taxable: data.Taxable,
        Icon: data.Icon
    };
};

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + ITEMS,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCurrentProductkey: builder.query({
            query: (categoryId) => ({
                url: `/GetCurrentKey?fatherId=${categoryId}`
            }),
            transformResponse: (response) => response.Response,
            providesTags: ['Product_id']
        }),
        getAllProducts: builder.query({
            query: ({ pageNumber, pageSize }) => ({
                url: `/GetAll?paging.PageNumber=${pageNumber}&paging.PageSize=${pageSize}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformProductData(item));
                } else {
                    return [];
                }
            },
        }),


        getProductsByCategory: builder.query({
            query: (id) => ({
                url: `/ApiGetByCategory?FatherID=${id}`,
            }),
            keepUnusedDataFor: shortCacheTime,
            transformResponse: (response) => response.Response
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/GetById?ProductId=${id}`,
            }),
        }),
        addProduct: builder.mutation({
            query: ({ product }) => ({
                url: `/Insert`,
                method: 'POST',
                body: product,
            }),
            onQueryStarted: async (branch, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.Success) {
                        dispatch(productsApi.util.invalidateTags(['Product_id']));
                    }
                } catch (error) {
                    return error
                }
            },
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/Update`,
                method: 'POST',
                body: convertToFormData(product),
            }),

        }),
        getProductUnits: builder.query({
            query: (id) => ({
                url: `/AppGetItemUnits?ItemID=${id}`,
            }),
            transformResponse: (response) => response.Response
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/Delete`,
                method: 'POST',
                body: convertToFormData(id),
            }),
        }),
        addComponent: builder.mutation(
            {
                query: (component) => ({
                    url: `/InsertRecipe`,
                    method: 'POST',
                    body: convertToFormData(component),
                }),
                invalidatesTags: ['Components']
            }
        ),
        updateComponent: builder.mutation({
            query: (component) => ({
                url: `/UpdateItemRecipe`,
                method: 'POST',
                body: convertToFormData(component),
            }),
            invalidatesTags: ['Components']
        }),
        deleteComponent: builder.mutation({
            query: ({ ItemID, SubItem }) => ({
                url: `/DeleteItemRecipe`,
                method: 'POST',
                body: convertToFormData({ ItemID, SubItem }),
            }),
            invalidatesTags: ['Components']
        }),
        getProductUnitsById: builder.query({
            query: (id) => ({
                url: `/ApiGetItemUnits?Id=${id}`,
            }),
            transformResponse: (response) => response.Response
        }),
        updateProductUnits: builder.mutation({
            query: (product) => ({
                url: `/UpdateWithUnits`,
                method: 'POST',
                body: convertToFormData(product),
            }),
        }),
        getProductsCost: builder.query({
            query: ({ CatID, Warehouse }) => ({
                url: `/GetItemsCost?CateID=${CatID}&Warehouse=${Warehouse}`,
            }),
            transformResponse: (response) => response.Response
        }),
        getProductsCosts: builder.query({
            query: ({ CateID, Warehouse }) => ({
                url: `/GetItemsCost?CateID=${CateID}&Warehouse=${Warehouse}`,
            }),
            transformResponse: (response) => response.Response
        })

    }),
});

export const {
    useLazyGetCurrentProductkeyQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useGetCurrentProductkeyQuery,
    useDeleteProductMutation,
    useAddComponentMutation,
    useGetProductsByCategoryQuery,
    useLazyGetProductsCostsQuery,
    useUpdateProductMutation,
    useGetProductUnitsByIdQuery,
    useLazyGetProductsByCategoryQuery,
    useUpdateComponentMutation,
    useDeleteComponentMutation,
    useGetAllProductsQuery,
    useLazyGetProductUnitsByIdQuery,
    useGetProductsCostsQuery,
    useGetProductUnitsQuery,
    useUpdateProductUnitsMutation
} = productsApi;
