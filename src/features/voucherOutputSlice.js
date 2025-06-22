import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, VOUCHER_OUTPUT } from './../api/endpoints.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformData = (data) => ({
    ...data,
   OutputType: data.OutputTypes,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});


export const voucherOutputsApi = createDynamicApi({
    reducerPath: 'voucherOutputsApi',
    baseEndpoint: BASEURL + VOUCHER_OUTPUT,
    active: true,
    isJson: true,
    updateJson: true,
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
        getVoucherOutputTypes: builder.query({
            query: () => ({
                url: '/GetAllOutputVoucherType',
            }),
            transformResponse: (response) => response.Response || response,
    
        }),
        getAllVoucherOutputDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDatailsByDocID?DocID=${id}`,
            }),
            transformResponse: (response) => response.Response || response,
                   providesTags: ["voucher"]
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
                         invalidatesTags: ["voucher"]
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
    useDeleteVoucherOutputDetailsMutation,
    useGetVoucherOutputTypesQuery
} = voucherOutputDetailsApi;
