import { deliveryCompaniesApi, useAddDeliveryCompanyMutation, useDeleteDeliveryCompanyMutation, useGetDeliveryCompaniesQuery, useUpdateDeliveryCompanyMutation } from "../features/deliveryCompanySlice";
import useEntityManagement from "../hooks/useEntityManagement";


const useDeliveryCompanyManagement = () => {
    return useEntityManagement({
        apiSlice: deliveryCompaniesApi,
        queryHook: useGetDeliveryCompaniesQuery,
        addMutationHook: useAddDeliveryCompanyMutation,
        updateMutationHook: useUpdateDeliveryCompanyMutation,
        deleteMutationHook: useDeleteDeliveryCompanyMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'CompanyID',
    });
}

export default useDeliveryCompanyManagement