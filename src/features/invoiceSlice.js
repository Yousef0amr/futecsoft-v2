import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, INVOICES } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformData = (data) => ({
    ...data,
    DocID: data.DocId,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});


export const invoicesApi = createDynamicApi({
    reducerPath: 'invoicesApi',
    baseEndpoint: BASEURL + INVOICES,
    transformData: (data) => transformData(data),
    isJson: true,
    active: false,
    updateJson: true
});

export const invoiceDetailsApi = createApi({
    reducerPath: 'invoiceDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + INVOICES,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllInvoiceDetails: builder.query({
            query: ({ id }) => {
                return {
                    url: `/GetDatailsByDocID?DocID=${id}`,
                };
            },
            transformResponse: (response) => response.Response || response,
              providesTags: ["voucher"]
        }),
        updateInvoiceDetails: builder.mutation({
            query: (data) => ({
                url: '/Update',
                method: 'POST',
                body: data,
            }),
        }),
        deleteInvoiceDetails: builder.mutation({
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
    useLazyGetCurrentKeyQuery: useGetCurrentInvoiceKeyQuery,
    useGetAllQuery: useGetInvoicesQuery,
    useAddMutation: useAddInvoiceMutation,
    useUpdateMutation: useUpdateInvoiceMutation,
    useDeleteMutation: useDeleteInvoiceMutation,
} = invoicesApi;


export const {
    useGetAllInvoiceDetailsQuery,
    useUpdateInvoiceDetailsMutation,
    useDeleteInvoiceDetailsMutation
} = invoiceDetailsApi;
