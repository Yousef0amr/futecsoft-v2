import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, VOUCHER_INPUT } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformVoucherData = (data) => ({
    ...data,
    DocID: data.DocId,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});


export const voucherInputsApi = createDynamicApi({
    reducerPath: 'voucherInputsApi',
    baseEndpoint: BASEURL + VOUCHER_INPUT,
    transformData: transformVoucherData
});

export const voucherInputDetailsApi = createApi({
    reducerPath: 'voucherInputDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + VOUCHER_INPUT,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllVoucherInputDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDatailsByDocID?DocID=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response || response,
        }),
        updateVoucherInputDetails: builder.mutation({
            query: (data) => ({
                url: '/UpdateWithDetails',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        deleteVoucherInputDetails: builder.mutation({
            query: (data) => ({
                url: '/DeleteVoucherDtl',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
    }),
})


export const {
    useGetCurrentKeyQuery: useGetCurrentVoucherInputKeyQuery,
    useGetAllQuery: useGetVoucherInputsQuery,
    useAddMutation: useAddVoucherInputMutation,
    useUpdateMutation: useUpdateVoucherInputMutation,
    useDeleteMutation: useDeleteVoucherInputMutation,

} = voucherInputsApi;


export const {
    useGetAllVoucherInputDetailsQuery,
    useUpdateVoucherInputDetailsMutation,
    useDeleteVoucherInputDetailsMutation

} = voucherInputDetailsApi;
