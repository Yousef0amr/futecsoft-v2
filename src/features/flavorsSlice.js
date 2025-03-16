
import { BASEURL, FLAVORS } from './../api/endpoints.js';
import createDynamicApi from '../utils/generateApiSlice.js';

const transformFlavorData = (data) => {
    return {
        WareHouse: data.Warehouse,
        FlavorAR: data.FlavorAr,
        FlavorEN: data.FlavorEn,
        ...data
    };
};

export const flavorsApi = createDynamicApi({
    reducerPath: 'flavorsApi',
    baseEndpoint: BASEURL + FLAVORS,
    transformData: transformFlavorData
});

export const {
    useGetCurrentKeyQuery: useGetCurrentFlavorKeyQuery,
    useGetAllQuery: useGetFlavorsQuery,
    useAddMutation: useAddFlavorMutation,
    useUpdateMutation: useUpdateFlavorMutation,
    useDeleteMutation: useDeleteFlavorMutation,
} = flavorsApi;
