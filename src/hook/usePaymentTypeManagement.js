import { paymentTypesApi, useAddPaymentTypeMutation, useDeletePaymentTypeMutation, useGetPaymentTypesQuery, useUpdatePaymentTypeMutation } from "../features/paymentTypeSlice";
import useEntityManagement from "../hooks/useEntityManagement";


const usePaymentTypeManagement = () => {
    return useEntityManagement({
        apiSlice: paymentTypesApi,
        queryHook: useGetPaymentTypesQuery,
        addMutationHook: useAddPaymentTypeMutation,
        updateMutationHook: useUpdatePaymentTypeMutation,
        deleteMutationHook: useDeletePaymentTypeMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'Ptype',
    });
}

export default usePaymentTypeManagement