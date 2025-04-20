import { useAddVoucherProvideMutation, useDeleteVoucherProvideDetailsMutation, useDeleteVoucherProvideMutation, useGetAllVoucherProvideDetailsQuery, useGetVoucherProvidesQuery, useUpdateVoucherProvideDetailsMutation, useUpdateVoucherProvideMutation, voucherProvideDetailsApi, voucherProvideApi } from "../features/voucherProvideSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useVoucherProvideManagement = () => {
    return useEntityManagement({
        apiSlice: voucherProvideApi,
        queryHook: useGetVoucherProvidesQuery,
        addMutationHook: useAddVoucherProvideMutation,
        updateMutationHook: useUpdateVoucherProvideMutation,
        deleteMutationHook: useDeleteVoucherProvideMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'ReqNo'
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
