
import useEntityManagement from './../hooks/useEntityManagement';
import { categoriesApi, useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../features/categorySlice';


const useCategoryManagement = () => {
    return useEntityManagement({
        apiSlice: categoriesApi,
        queryHook: useGetCategoriesQuery,
        addMutationHook: useAddCategoryMutation,
        updateMutationHook: useUpdateCategoryMutation,
        deleteMutationHook: useDeleteCategoryMutation,
        cacheKey: 'getCategories',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'Id'
    });
};


export default useCategoryManagement
