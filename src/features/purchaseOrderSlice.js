import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, PURCHASE_ORDER } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformPurchaseOrderData = (data) => ({
    ...data,
    DocID: data.DocId,
    DocDate: data.DocDate
        ? new Date(data.DocDate).toISOString().split('T')[0]
        : null,
});

export const purchaseOrderApi = createDynamicApi({
    reducerPath: 'purchaseOrderApi',
    baseEndpoint: BASEURL + PURCHASE_ORDER,
    transformData: transformPurchaseOrderData
});

export const purchaseOrderDetailsApi = createApi({
    reducerPath: 'purchaseOrderDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + PURCHASE_ORDER,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllPurchaseOrderDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDatailsByDocID?DocID=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response || response,
        }),
        updatePurchaseOrderDetails: builder.mutation({
            query: (data) => ({
                url: '/UpdateWithDetails',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        deletePurchaseOrderDetails: builder.mutation({
            query: (data) => ({
                url: '/DeleteVoucherDtl',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
    }),
});

export const {
    useGetCurrentKeyQuery: useGetCurrentPurchaseOrderKeyQuery,
    useGetAllQuery: useGetPurchaseOrdersQuery,
    useAddMutation: useAddPurchaseOrderMutation,
    useUpdateMutation: useUpdatePurchaseOrderMutation,
    useDeleteMutation: useDeletePurchaseOrderMutation,
} = purchaseOrderApi;

export const {
    useGetAllPurchaseOrderDetailsQuery,
    useUpdatePurchaseOrderDetailsMutation,
    useDeletePurchaseOrderDetailsMutation
} = purchaseOrderDetailsApi;
