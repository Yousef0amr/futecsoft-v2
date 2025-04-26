import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, VOUCHER_RECEIVING } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformVoucherRecievingData = (data) => ({
    ...data,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});

export const voucherRecievingApi = createDynamicApi({
    reducerPath: 'voucherRecievingApi',
    baseEndpoint: BASEURL + VOUCHER_RECEIVING,
    active: true,
    isJson: true,
    transformData: transformVoucherRecievingData
});

export const voucherRecievingDetailsApi = createApi({
    reducerPath: 'voucherRecievingDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + VOUCHER_RECEIVING,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllVoucherRecievingDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDatailsByDocID?DocID=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response || response,
        }),
        updateVoucherRecievingDetails: builder.mutation({
            query: (data) => ({
                url: '/UpdateHeader',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        deleteVoucherRecievingDetails: builder.mutation({
            query: (data) => ({
                url: '/DeleteVoucherDtl',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
    }),
});

export const {
    useGetCurrentKeyQuery: useGetCurrentVoucherRecievingKeyQuery,
    useGetAllQuery: useGetVoucherRecievingsQuery,
    useAddMutation: useAddVoucherRecievingMutation,
    useUpdateMutation: useUpdateVoucherRecievingMutation,
    useDeleteMutation: useDeleteVoucherRecievingMutation,
} = voucherRecievingApi;

export const {
    useGetAllVoucherRecievingDetailsQuery,
    useUpdateVoucherRecievingDetailsMutation,
    useDeleteVoucherRecievingDetailsMutation
} = voucherRecievingDetailsApi;
