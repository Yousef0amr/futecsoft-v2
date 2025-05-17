
import { voucherTransferApi, voucherTransferDetailsApi, useAddVoucherTransferMutation, useGetVoucherTransfersQuery, useUpdateVoucherTransferMutation, useDeleteVoucherTransferMutation, useGetAllVoucherTransferDetailsQuery, useUpdateVoucherTransferDetailsMutation, useDeleteVoucherTransferDetailsMutation } from "../features/voucherTransferSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherTransferManagement = () => {
    return useEntityManagement({
        apiSlice: voucherTransferApi,
        queryHook: useGetVoucherTransfersQuery,
        addMutationHook: useAddVoucherTransferMutation,
        updateMutationHook: useUpdateVoucherTransferMutation,
        deleteMutationHook: useDeleteVoucherTransferMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocNo'
    });
}


export const useVoucherTransferItemsManagement = ({ id, skip }) => {
    return useEntityManagement({
        apiSlice: voucherTransferDetailsApi,
        queryHook: useGetAllVoucherTransferDetailsQuery,
        addMutationHook: useUpdateVoucherTransferDetailsMutation,
        updateMutationHook: useUpdateVoucherTransferDetailsMutation,
        deleteMutationHook: useDeleteVoucherTransferDetailsMutation,
        cacheKey: 'getAllVoucherTransferDetails',
        defaultQueryArgs: {
            id
        },
        skip,
        identifier: 'ItemID'
    });
}


export default useVoucherTransferManagement
