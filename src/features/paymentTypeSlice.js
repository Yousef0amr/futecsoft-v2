import createDynamicApi from '../utils/generateApiSlice.js';
import { BASEURL, PAYMENTS_TYPES } from '../api/endpoints.js';


const transformPaymentTypeData = (data) => ({
    ...data,
    CompanyID: data.CompanyId
});

export const paymentTypesApi = createDynamicApi({
    reducerPath: 'paymentTypesApi',
    baseEndpoint: BASEURL + PAYMENTS_TYPES,
    transformData: transformPaymentTypeData
});

export const {
    useGetCurrentKeyQuery: useGetCurrentPaymentTypeKeyQuery,
    useGetAllQuery: useGetPaymentTypesQuery,
    useAddMutation: useAddPaymentTypeMutation,
    useUpdateMutation: useUpdatePaymentTypeMutation,
    useDeleteMutation: useDeletePaymentTypeMutation,
} = paymentTypesApi;
