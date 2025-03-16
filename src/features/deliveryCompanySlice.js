import createDynamicApi from '../utils/generateApiSlice.js';
import { BASEURL, DELIVERY_COMPANY } from '../api/endpoints.js';



const transformDeliveryCompanyData = (data) => ({
    ...data,
    CompanyID: data.CompanyId,
    percent: data.Percent
});

export const deliveryCompaniesApi = createDynamicApi({
    reducerPath: 'deliveryCompaniesApi',
    baseEndpoint: BASEURL + DELIVERY_COMPANY,
    transformData: transformDeliveryCompanyData
});

export const {
    useGetCurrentKeyQuery: useGetCurrentDeliveryCompanyKeyQuery,
    useGetAllQuery: useGetDeliveryCompaniesQuery,
    useAddMutation: useAddDeliveryCompanyMutation,
    useUpdateMutation: useUpdateDeliveryCompanyMutation,
    useDeleteMutation: useDeleteDeliveryCompanyMutation,
} = deliveryCompaniesApi;
