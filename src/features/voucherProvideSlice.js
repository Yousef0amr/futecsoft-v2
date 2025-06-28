import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, VOUCHER_PROVIDE } from './../api/endpoints.js';
import { longCacheTime } from '../config/constants.js';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getCookie from '../utils/getCookie.js';
import convertToFormData from '../utils/convertToFormData.js';

const transformVoucherProvideData = (data) => ({
    ...data,
    ReqDate: data.ReqDate
        ? new Date(data.ReqDate).toLocaleDateString('en-CA')
        : null,
    FromDate: data.FromDate
        ? new Date(data.FromDate).toLocaleDateString('en-CA')
        : null,
    ToDate: data.ToDate
        ? new Date(data.ToDate).toLocaleDateString('en-CA')
        : null,
});


const transformVoucherItemsProvideData = (data) => ({
    ...data,
    ItemID: data.ItemNo,
    Qty: data.ProvideQty,
    UnitID: data.Unit,

});

export const voucherProvideApi = createDynamicApi({
    reducerPath: 'voucherProvideApi',
    baseEndpoint: BASEURL + VOUCHER_PROVIDE,
    active: true,
    isJson: true,
    updateString: 'UpdateHeader',
    transformData: transformVoucherProvideData
});

export const voucherProvideDetailsApi = createApi({
    reducerPath: 'voucherProvideDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + VOUCHER_PROVIDE,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllVoucherProvideDetails: builder.query({
            query: ({ id }) => ({
                url: `/GetDatailsByDocID?ReqNo=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformVoucherItemsProvideData(item));
                } else {
                    return [];
                }
            }
        }),
        updateVoucherProvideDetails: builder.mutation({
            query: (data) => ({
                url: '/Update',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        deleteVoucherProvideDetails: builder.mutation({
            query: (data) => ({
                url: '/DeleteVoucherDtl',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
    }),
});

export const {
    useGetCurrentKeyQuery: useGetCurrentVoucherProvideKeyQuery,
    useGetAllQuery: useGetVoucherProvidesQuery,
    useAddMutation: useAddVoucherProvideMutation,
    useUpdateMutation: useUpdateVoucherProvideMutation,
    useDeleteMutation: useDeleteVoucherProvideMutation,
} = voucherProvideApi;

export const {
    useGetAllVoucherProvideDetailsQuery,
    useUpdateVoucherProvideDetailsMutation,
    useDeleteVoucherProvideDetailsMutation
} = voucherProvideDetailsApi;
