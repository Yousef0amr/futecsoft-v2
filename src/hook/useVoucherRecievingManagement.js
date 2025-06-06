import { useAddVoucherRecievingMutation, useDeleteVoucherRecievingDetailsMutation, useDeleteVoucherRecievingMutation, useGetAllVoucherRecievingDetailsQuery, useGetVoucherRecievingsQuery, useUpdateVoucherRecievingDetailsMutation, useUpdateVoucherRecievingMutation, voucherRecievingDetailsApi, voucherRecievingApi } from "../features/voucherRecievingSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherRecievingManagement = () => {
    return useEntityManagement({
        apiSlice: voucherRecievingApi,
        queryHook: useGetVoucherRecievingsQuery,
        addMutationHook: useAddVoucherRecievingMutation,
        updateMutationHook: useUpdateVoucherRecievingMutation,
        deleteMutationHook: useDeleteVoucherRecievingMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocID'
    });
}

export const useVoucherRecievingItemsManagement = ({ id, skip }) => {
    return useEntityManagement({
        apiSlice: voucherRecievingDetailsApi,
        queryHook: useGetAllVoucherRecievingDetailsQuery,
        addMutationHook: useUpdateVoucherRecievingDetailsMutation,
        updateMutationHook: useUpdateVoucherRecievingDetailsMutation,
        deleteMutationHook: useDeleteVoucherRecievingDetailsMutation,
        cacheKey: 'getAllVoucherRecievingDetails',
        defaultQueryArgs: {
            id
        },
        skip,
        identifier: 'ItemID'
    });
}

export default useVoucherRecievingManagement;
