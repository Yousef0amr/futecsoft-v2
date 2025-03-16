import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, CATEGORIES } from './../api/endpoints.js';
import convertToFormData from './../utils/convertToFormData.js';
import getCookie from './../utils/getCookie.js';
import { longCacheTime } from './../config/constants.js';

const transformCategoryData = (data) => {
    return {
        Id: data.CatID,
        NameAr: data.Cat_AR_Name,
        NameEn: data.Cat_EN_Name,
        Warehouse: data.TagDesc,
        BranchId: data.Tag,
        Saleable: data.Saleable,
        IsActive: data.Active
    };
};
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + CATEGORIES,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCurrentCategoryKey: builder.query({
            query: () => ({
                url: '/GetCurrentKey',
            }),
            transformResponse: (response) => response.Response,
            providesTags: ['Category_id']
        }),
        getCategories: builder.query({
            query: ({ pageNumber, pageSize }) => ({
                url: `/GetAll?paging.PageNumber=${pageNumber}&paging.PageSize=${pageSize}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformCategoryData(item));
                } else {
                    return [];
                }
            },
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/GetById?CategoryId=${id}`,
            }),
            transformResponse: (response) => response.Response
        }),
        getAllCategoriesByBranch: builder.query({
            query: (id) => ({
                url: `/GetAllByWarehouse?Warehouse=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/Insert',
                method: 'POST',
                body: convertToFormData(category),
            }),
            onQueryStarted: async (category, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.Success) {
                        dispatch(categoriesApi.util.invalidateTags(['Category_id']));
                    }
                } catch (error) {
                    return error
                }
            },
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: '/Update',
                method: 'POST',
                body: convertToFormData(category),
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/Delete`,
                method: 'POST',
                body: convertToFormData(id),
            }),
        }),
        getCategoriesNoneCompostie: builder.query({
            query: ({ Warehouse }) => ({
                url: `/GetCateNoneComposite?BranchId=${Warehouse}`,
            }),
            transformResponse: (response) => response.Response
        })
    }),
});

export const {
    useGetCurrentCategoryKeyQuery,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesByBranchQuery,
    useLazyGetAllCategoriesByBranchQuery,
    useGetCategoriesNoneCompostieQuery
} = categoriesApi;
