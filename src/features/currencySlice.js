import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, CURRENCIES } from './../api/endpoints.js';

export const currenciesApi = createDynamicApi({
    reducerPath: 'currenciesApi',
    baseEndpoint: BASEURL + CURRENCIES
});

export const {
    useGetAllQuery: useGetCurrenciesQuery,
    useAddMutation: useAddCurrencyMutation,
    useUpdateMutation: useUpdateCurrencyMutation,
    useDeleteMutation: useDeleteCurrencyMutation,

} = currenciesApi;
