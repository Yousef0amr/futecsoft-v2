import { useAddPurchaseOrderMutation, useDeletePurchaseOrderDetailsMutation, useDeletePurchaseOrderMutation, useGetAllPurchaseOrderDetailsQuery, useGetPurchaseOrdersQuery, useUpdatePurchaseOrderDetailsMutation, useUpdatePurchaseOrderMutation, purchaseOrderDetailsApi, purchaseOrderApi } from "../features/purchaseOrderSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const usePurchaseOrderManagement = () => {
    return useEntityManagement({
        apiSlice: purchaseOrderApi,
        queryHook: useGetPurchaseOrdersQuery,
        addMutationHook: useAddPurchaseOrderMutation,
        updateMutationHook: useUpdatePurchaseOrderMutation,
        deleteMutationHook: useDeletePurchaseOrderMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocID'
    });
}

export const usePurchaseOrderItemsManagement = ({ id, skip }) => {
    return useEntityManagement({
        apiSlice: purchaseOrderDetailsApi,
        queryHook: useGetAllPurchaseOrderDetailsQuery,
        addMutationHook: useUpdatePurchaseOrderDetailsMutation,
        updateMutationHook: useUpdatePurchaseOrderDetailsMutation,
        deleteMutationHook: useDeletePurchaseOrderDetailsMutation,
        cacheKey: 'getAllPurchaseOrderDetails',
        defaultQueryArgs: {
            id
        },
        skip,
        identifier: 'ItemID'
    });
}

export default usePurchaseOrderManagement;
