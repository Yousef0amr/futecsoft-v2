import { useAddPurchaseOrderMutation, useDeletePurchaseOrderDetailsMutation, useDeletePurchaseOrderMutation, useGetAllPurchaseOrderDetailsQuery, useGetPurchaseOrdersQuery, useUpdatePurchaseOrderDetailsMutation, useUpdatePurchaseOrderMutation, purchaseOrderDetailsApi, purchaseOrdersApi } from "../features/purchaseOrderSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const usePurchaseOrderManagement = () => {
    return useEntityManagement({
        apiSlice: purchaseOrdersApi,
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

export const usePurchaseOrderItemsManagement = ({ id }) => {
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
        identifier: 'ItemID'
    });
}

export default usePurchaseOrderManagement;
