import createDynamicApi from "../utils/generateApiSlice";
import { BASEURL, USERS_GROUP } from "../api/endpoints";



export const userGroupsApi = createDynamicApi({
    reducerPath: 'userGroupsApi',
    baseEndpoint: BASEURL + USERS_GROUP,
});
export const {
    useGetCurrentKeyQuery: useGetCurrentUserGroupKeyQuery,
    useGetAllQuery: useGetUserGroupsQuery,
    useAddMutation: useAddUserGroupMutation,
    useUpdateMutation: useUpdateUserGroupMutation,
    useDeleteMutation: useDeleteUserGroupMutation,
} = userGroupsApi;