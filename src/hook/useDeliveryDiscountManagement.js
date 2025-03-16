import { deliveryDiscountApi, useAddMutation, useDeleteMutation, useGetAllDeliveryDiscountQuery, useUpdateMutation } from "../features/deliveryDiscountSlice";
import useEntityManagement from "../hooks/useEntityManagement";


const useDeliveryDiscountManagement = () => {
    return useEntityManagement({
        apiSlice: deliveryDiscountApi,
        queryHook: useGetAllDeliveryDiscountQuery,
        addMutationHook: useAddMutation,
        updateMutationHook: useUpdateMutation,
        deleteMutationHook: useDeleteMutation,
        cacheKey: 'getAllDeliveryDiscount',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'LineID',
    });
}

export default useDeliveryDiscountManagement