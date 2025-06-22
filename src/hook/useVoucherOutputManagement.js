
import { voucherOutputsApi, voucherOutputDetailsApi, useAddVoucherOutputMutation, useGetVoucherOutputsQuery, useUpdateVoucherOutputMutation, useDeleteVoucherOutputMutation, useGetAllVoucherOutputDetailsQuery, useUpdateVoucherOutputDetailsMutation, useDeleteVoucherOutputDetailsMutation } from "../features/voucherOutputSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherOutputManagement = () => {
    return useEntityManagement({
        apiSlice: voucherOutputsApi,
        queryHook: useGetVoucherOutputsQuery,
        addMutationHook: useAddVoucherOutputMutation,
        updateMutationHook: useUpdateVoucherOutputMutation,
        deleteMutationHook: useDeleteVoucherOutputMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocNo'
    });
}


export const useVoucherOutputItemsManagement = ({ id, skip,queryParams }) => {
    return useEntityManagement({
        apiSlice: voucherOutputDetailsApi,
        queryHook: useGetAllVoucherOutputDetailsQuery,
        addMutationHook: useUpdateVoucherOutputDetailsMutation,
        updateMutationHook: useUpdateVoucherOutputDetailsMutation,
        deleteMutationHook: useDeleteVoucherOutputDetailsMutation,
        cacheKey: 'getAllVoucherOutputDetails',
        defaultQueryArgs: {
            id
        },
        skip,
        queryParams,
        identifier: 'ItemID'
    });
}


export default useVoucherOutputManagement
