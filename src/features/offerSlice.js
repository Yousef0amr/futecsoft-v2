import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, OFFERS } from './../api/endpoints.js';

const transformOfferData = (data) => ({
    ...data,
    Product: data.ProductId,
    FromDate: data.FromDate
        ? new Date(data.FromDate).toISOString().split('T')[0]
        : null,
    ToDate: data.ToDate
        ? new Date(data.ToDate).toISOString().split('T')[0]
        : null,

});

export const offersApi = createDynamicApi({
    reducerPath: 'offersApi',
    baseEndpoint: BASEURL + OFFERS,
    transformData: transformOfferData
});

export const {
    useGetCurrentKeyQuery: useGetCurrentOfferKeyQuery,
    useGetAllQuery: useGetOffersQuery,
    useAddMutation: useAddOfferMutation,
    useUpdateMutation: useUpdateOfferMutation,
    useDeleteMutation: useDeleteOfferMutation,
} = offersApi;
