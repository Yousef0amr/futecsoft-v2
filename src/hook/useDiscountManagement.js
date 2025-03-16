
import { discountsApi, useAddDiscountMutation, useDeleteDiscountMutation, useGetDiscountsQuery, useUpdateDiscountMutation } from '../features/discountSlice';
import useEntityManagement from '../hooks/useEntityManagement';


const useDiscountManagement = () => {
    return useEntityManagement({
        apiSlice: discountsApi,
        queryHook: useGetDiscountsQuery,
        addMutationHook: useAddDiscountMutation,
        updateMutationHook: useUpdateDiscountMutation,
        deleteMutationHook: useDeleteDiscountMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'Serial'
    });
}

export default useDiscountManagement
