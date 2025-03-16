import { suppliersApi, useAddSupplierMutation, useDeleteSupplierMutation, useGetSuppliersQuery, useUpdateSupplierMutation } from '../features/supplierSlice';
import useEntityManagement from '../hooks/useEntityManagement';


const useSupplierManagement = () => {
    return useEntityManagement({
        apiSlice: suppliersApi,
        queryHook: useGetSuppliersQuery,
        addMutationHook: useAddSupplierMutation,
        updateMutationHook: useUpdateSupplierMutation,
        deleteMutationHook: useDeleteSupplierMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'SupplierId',
    });
}

export default useSupplierManagement
