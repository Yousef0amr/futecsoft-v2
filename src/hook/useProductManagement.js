
import useEntityManagement from './../hooks/useEntityManagement';
import { useGetAllProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, productsApi } from '../features/productSlice';


const useProductManagement = () => {
    return useEntityManagement({
        apiSlice: productsApi,
        queryHook: useGetAllProductsQuery,
        addMutationHook: useAddProductMutation,
        updateMutationHook: useUpdateProductMutation,
        deleteMutationHook: useDeleteProductMutation,
        cacheKey: 'getProductByType',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
            branch: '',
        },
        identifier: 'Id',
    });
};



export default useProductManagement;
