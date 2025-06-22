
import useEntityManagement from './../hooks/useEntityManagement';
import { useAddComponentMutation, useGetCompositeComponentsByIdQuery, useDeleteComponentMutation, useUpdateComponentMutation, productsApi } from '../features/productSlice';


const useCompComponentsManagement = (id) => {
    return useEntityManagement({
        apiSlice: productsApi,
        queryHook: useGetCompositeComponentsByIdQuery,
        addMutationHook: useAddComponentMutation,
        updateMutationHook: useUpdateComponentMutation,
        deleteMutationHook: useDeleteComponentMutation,
        cacheKey: 'getCompositeComponentsById',
        defaultQueryArgs: id,
        identifier: 'Id',
    });
};



export default useCompComponentsManagement;
