import { useAddVoucherProvideMutation, useDeleteVoucherProvideDetailsMutation, useDeleteVoucherProvideMutation, useGetAllVoucherProvideDetailsQuery, useGetVoucherProvidesQuery, useUpdateVoucherProvideDetailsMutation, useUpdateVoucherProvideMutation, voucherProvideDetailsApi, voucherProvidesApi } from "../features/voucherProvideSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherProvideManagement = () => {
    return useEntityManagement({
        apiSlice: voucherProvidesApi,
        queryHook: useGetVoucherProvidesQuery,
        addMutationHook: useAddVoucherProvideMutation,
        updateMutationHook: useUpdateVoucherProvideMutation,
        deleteMutationHook: useDeleteVoucherProvideMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocID'
    });
}

export const useVoucherProvideItemsManagement = ({ id }) => {
    return useEntityManagement({
        apiSlice: voucherProvideDetailsApi,
        queryHook: useGetAllVoucherProvideDetailsQuery,
        addMutationHook: useUpdateVoucherProvideDetailsMutation,
        updateMutationHook: useUpdateVoucherProvideDetailsMutation,
        deleteMutationHook: useDeleteVoucherProvideDetailsMutation,
        cacheKey: 'getAllVoucherProvideDetails',
        defaultQueryArgs: {
            id
        },
        identifier: 'ItemID'
    });
}

export default useVoucherProvideManagement;
