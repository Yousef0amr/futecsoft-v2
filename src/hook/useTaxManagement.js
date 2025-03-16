
import useEntityManagement from '../hooks/useEntityManagement';
import { taxesApi, useAddTaxMutation, useDeleteTaxMutation, useGetTaxesQuery, useUpdateTaxMutation } from '../features/taxSlice';

const useTaxManagement = () => {
    return useEntityManagement({
        apiSlice: taxesApi,
        queryHook: useGetTaxesQuery,
        addMutationHook: useAddTaxMutation,
        updateMutationHook: useUpdateTaxMutation,
        deleteMutationHook: useDeleteTaxMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'TaxId'
    });
}

export default useTaxManagement
