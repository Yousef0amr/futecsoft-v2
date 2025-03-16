
import { userGroupsApi, useAddUserGroupMutation, useDeleteUserGroupMutation, useGetUserGroupsQuery, useUpdateUserGroupMutation } from '../features/userGroupSlice';
import useEntityManagement from './../hooks/useEntityManagement';
const useUserGroupManagement = () => {
    return useEntityManagement({
        apiSlice: userGroupsApi,
        queryHook: useGetUserGroupsQuery,
        addMutationHook: useAddUserGroupMutation,
        deleteMutationHook: useDeleteUserGroupMutation,
        updateMutationHook: useUpdateUserGroupMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'GroupId'
    });
}

export default useUserGroupManagement
