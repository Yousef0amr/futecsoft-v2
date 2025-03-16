
import { offersApi, useAddOfferMutation, useDeleteOfferMutation, useGetOffersQuery, useUpdateOfferMutation } from '../features/offerSlice';
import useEntityManagement from '../hooks/useEntityManagement';

const useOfferManagement = () => {
    return useEntityManagement({
        apiSlice: offersApi,
        queryHook: useGetOffersQuery,
        addMutationHook: useAddOfferMutation,
        updateMutationHook: useUpdateOfferMutation,
        deleteMutationHook: useDeleteOfferMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'OfferId'
    });
}

export default useOfferManagement
