import { BASEURL, BRANCHES } from './../api/endpoints.js';
import createDynamicApi from '../utils/generateApiSlice.js';


export const branchesApi = createDynamicApi({
    reducerPath: 'branchesApi',
    baseEndpoint: BASEURL + BRANCHES,
});

export const {
    useGetCurrentKeyQuery: useGetCurrentBranchKeyQuery,
    useGetAllQuery: useGetBranchesQuery,
    useAddMutation: useAddBranchMutation,
    useUpdateMutation: useUpdateBranchMutation,
    useDeleteMutation: useDeleteBranchMutation,
} = branchesApi;
