import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import convertToFormData from './../utils/convertToFormData.js';
import getCookie from './../utils/getCookie.js';
import { longCacheTime } from '../config/constants.js';

const createDynamicApi = ({ active = true, updateString,updateJson=false, reducerPath, baseEndpoint, transformData, isJson = false }) => {
    const api = createApi({
        reducerPath,
        baseQuery: fetchBaseQuery({
            baseUrl: baseEndpoint,
            prepareHeaders: (headers) => {
                headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
                return headers;
            },
        }),
        endpoints: (builder) => {
            const defaultEndpoints = {
                getCurrentKey: builder.query({
                    query: () => ({
                        url: '/GetCurrentKey',
                    }),
                    providesTags: active ? [`${reducerPath}_id`] : null,
                    transformResponse: (response) => response.Response,
                }),
                getAll: builder.query({
                    query: ({ pageNumber, pageSize }) => ({
                        url: `/GetAll?paging.PageNumber=${pageNumber}&paging.PageSize=${pageSize}`,
                    }),
                    keepUnusedDataFor: longCacheTime,
                    transformResponse: (response) => {
                        const data = response.Response || response;
                        if (Array.isArray(data)) {
                            return data.map(item => (transformData ? transformData(item) : item));
                        } else {
                            return [];
                        }
                    },
                }),
                add: builder.mutation({
                    query: (data) => ({
                        url: '/Insert',
                        method: 'POST',
                        body: isJson ? data : convertToFormData(data),
                    }),
                    onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
                        try {
                            const { data: responseData } = await queryFulfilled;
                            if (responseData?.Success) {
                                active && dispatch(api.util.invalidateTags([`${reducerPath}_id`]));
                            }
                        } catch (error) {
                            return error;
                        }
                    },
                }),
                update: builder.mutation({
                    query: (data) => ({
                        url: updateString ? updateString : '/Update',
                        method: 'POST',
                        body: updateJson ?data :  convertToFormData(data),
                    }),
                }),
                delete: builder.mutation({
                    query: (id) => ({
                        url: '/Delete',
                        method: 'POST',
                        body: convertToFormData(id),
                    }),
                }),
            };
            return defaultEndpoints;
        },
    });

    return api;
};

export default createDynamicApi;
