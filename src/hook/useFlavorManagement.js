import { flavorsApi, useAddFlavorMutation, useDeleteFlavorMutation, useGetFlavorsQuery, useUpdateFlavorMutation } from "../features/flavorsSlice";
import useEntityManagement from "../hooks/useEntityManagement";


const useFlavorManagement = () => {
    return useEntityManagement({
        apiSlice: flavorsApi,
        queryHook: useGetFlavorsQuery,
        addMutationHook: useAddFlavorMutation,
        updateMutationHook: useUpdateFlavorMutation,
        deleteMutationHook: useDeleteFlavorMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'FlavorNo'
    });
}

export default useFlavorManagement
