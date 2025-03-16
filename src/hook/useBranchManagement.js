
import useEntityManagement from './../hooks/useEntityManagement';
import { branchesApi, useAddBranchMutation, useDeleteBranchMutation, useGetBranchesQuery, useUpdateBranchMutation } from '../features/branchesSlice';



const useBranchManagement = () => {
    return useEntityManagement({
        apiSlice: branchesApi,
        queryHook: useGetBranchesQuery,
        addMutationHook: useAddBranchMutation,
        updateMutationHook: useUpdateBranchMutation,
        deleteMutationHook: useDeleteBranchMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'BranchId',
    });
};



export default useBranchManagement;
