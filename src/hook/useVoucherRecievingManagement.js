import { useAddVoucherRecievingMutation, useDeleteVoucherRecievingDetailsMutation, useDeleteVoucherRecievingMutation, useGetAllVoucherRecievingDetailsQuery, useGetVoucherRecievingsQuery, useUpdateVoucherRecievingDetailsMutation, useUpdateVoucherRecievingMutation, voucherRecievingDetailsApi, voucherRecievingsApi } from "../features/voucherRecievingSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherRecievingManagement = () => {
    return useEntityManagement({
        apiSlice: voucherRecievingsApi,
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

export const useVoucherRecievingItemsManagement = ({ id }) => {
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
        identifier: 'ItemID'
    });
}

export default useVoucherRecievingManagement;
