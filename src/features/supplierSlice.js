import createDynamicApi from '../utils/generateApiSlice.js';
import { BASEURL, SUPPLIERS } from '../api/endpoints.js';




export const suppliersApi = createDynamicApi({
    reducerPath: 'suppliersApi',
    baseEndpoint: BASEURL + SUPPLIERS
});

export const {
    useGetCurrentKeyQuery: useGetCurrentSupplierKeyQuery,
    useGetAllQuery: useGetSuppliersQuery,
    useAddMutation: useAddSupplierMutation,
    useUpdateMutation: useUpdateSupplierMutation,
    useDeleteMutation: useDeleteSupplierMutation,
} = suppliersApi;
