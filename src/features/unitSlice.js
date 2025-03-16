import { BASEURL, UNITS } from './../api/endpoints.js';
import createDynamicApi from '../utils/generateApiSlice.js';



const transformUnitData = (data) => {
    return {
        UnitID: data.UnitId,
        Unit_AR: data.UnitAr,
        Unit_EN: data.UnitEn,
        Active: data.Active,
    };
};


export const unitsApi = createDynamicApi({
    reducerPath: 'unitsApi',
    baseEndpoint: BASEURL + UNITS,
    transformData: transformUnitData
});
export const {
    useGetCurrentKeyQuery: useGetCurrentUnitKeyQuery,
    useGetAllQuery: useGetUnitsQuery,
    useAddMutation: useAddUnitMutation,
    useUpdateMutation: useUpdateUnitMutation,
    useDeleteMutation: useDeleteUnitMutation,
} = unitsApi;
