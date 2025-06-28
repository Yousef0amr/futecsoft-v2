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
        ? new Date(data.DocDate).toLocaleDateString('en-CA')
        : null,
});


export const voucherInputsApi = createDynamicApi({
    reducerPath: 'voucherInputsApi',
    baseEndpoint: BASEURL + VOUCHER_INPUT,
    active: true,
    isJson: true,
    updateJson: true,
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
            transformResponse: (response) => response.Response || response,
            providesTags: ["voucher"]
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
            invalidatesTags: ["voucher"]
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
