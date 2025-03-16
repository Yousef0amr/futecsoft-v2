
import useEntityManagement from '../hooks/useEntityManagement';
import { currenciesApi, useAddCurrencyMutation, useGetCurrenciesQuery, useUpdateCurrencyMutation, useDeleteCurrencyMutation } from '../features/currencySlice';

const useCurrencyManagment = () => {
    return useEntityManagement({
        apiSlice: currenciesApi,
        queryHook: useGetCurrenciesQuery,
        addMutationHook: useAddCurrencyMutation,
        updateMutationHook: useUpdateCurrencyMutation,
        deleteMutationHook: useDeleteCurrencyMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'CurrencyId'
    });
}

export default useCurrencyManagment