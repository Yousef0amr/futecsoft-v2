import { BASEURL, TAXES } from './../api/endpoints.js'
import createDynamicApi from '../utils/generateApiSlice.js';

export const taxesApi = createDynamicApi({
    reducerPath: 'taxesApi',
    baseEndpoint: BASEURL + TAXES,
});

export const {
    useGetCurrentKeyQuery: useGetCurrentTaxKeyQuery,
    useGetAllQuery: useGetTaxesQuery,
    useAddMutation: useAddTaxMutation,
    useUpdateMutation: useUpdateTaxMutation,
    useDeleteMutation: useDeleteTaxMutation,
} = taxesApi;
