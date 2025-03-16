import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, VOUCHER_OUTPUT } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformData = (data) => ({
    ...data,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});


export const voucherOutputsApi = createDynamicApi({
    reducerPath: 'voucherOutputsApi',
    baseEndpoint: BASEURL + VOUCHER_OUTPUT,
    transformData
});

export const voucherOutputDetailsApi = createApi({
    reducerPath: 'voucherOutputDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + VOUCHER_OUTPUT,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllVoucherOutputDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDetailsByDocNo?DocNo=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response || response,
        }),
        updateVoucherOutputDetails: builder.mutation({
            query: (data) => ({
                url: '/UpdateWithDetails',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        deleteVoucherOutputDetails: builder.mutation({
            query: (data) => ({
                url: '/DeleteVoucherDtl',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
    }),
})


export const {
    useGetCurrentKeyQuery: useGetCurrentVoucherOutputKeyQuery,
    useGetAllQuery: useGetVoucherOutputsQuery,
    useAddMutation: useAddVoucherOutputMutation,
    useUpdateMutation: useUpdateVoucherOutputMutation,
    useDeleteMutation: useDeleteVoucherOutputMutation,
} = voucherOutputsApi;


export const {
    useGetAllVoucherOutputDetailsQuery,
    useUpdateVoucherOutputDetailsMutation,
    useDeleteVoucherOutputDetailsMutation
} = voucherOutputDetailsApi;
