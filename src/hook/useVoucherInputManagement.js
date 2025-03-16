
import { useAddVoucherInputMutation, useDeleteVoucherInputDetailsMutation, useDeleteVoucherInputMutation, useGetAllVoucherInputDetailsQuery, useGetVoucherInputsQuery, useUpdateVoucherInputDetailsMutation, useUpdateVoucherInputMutation, voucherInputDetailsApi, voucherInputsApi } from "../features/voucherInputSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherInputManagement = () => {
    return useEntityManagement({
        apiSlice: voucherInputsApi,
        queryHook: useGetVoucherInputsQuery,
        addMutationHook: useAddVoucherInputMutation,
        updateMutationHook: useUpdateVoucherInputMutation,
        deleteMutationHook: useDeleteVoucherInputMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocID'
    });
}


export const useVoucherInputItemsManagement = ({ id }) => {
    return useEntityManagement({
        apiSlice: voucherInputDetailsApi,
        queryHook: useGetAllVoucherInputDetailsQuery,
        addMutationHook: useUpdateVoucherInputDetailsMutation,
        updateMutationHook: useUpdateVoucherInputDetailsMutation,
        deleteMutationHook: useDeleteVoucherInputDetailsMutation,
        cacheKey: 'getAllVoucherInputDetails',
        defaultQueryArgs: {
            id
        },
        identifier: 'ItemID'
    });
}

export default useVoucherInputManagement
