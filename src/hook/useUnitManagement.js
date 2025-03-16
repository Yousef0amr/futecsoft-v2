import { unitsApi, useAddUnitMutation, useDeleteUnitMutation, useGetUnitsQuery, useUpdateUnitMutation } from "../features/unitSlice";
import useEntityManagement from "./../hooks/useEntityManagement";



const useUnitManagement = () => {
    return useEntityManagement({
        apiSlice: unitsApi,
        queryHook: useGetUnitsQuery,
        addMutationHook: useAddUnitMutation,
        updateMutationHook: useUpdateUnitMutation,
        deleteMutationHook: useDeleteUnitMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'UnitID'
    });
}

export default useUnitManagement
