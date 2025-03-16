import createDynamicApi from './../utils/generateApiSlice.js';
import { BASEURL, DISCOUNT } from './../api/endpoints.js';

const transformOfferData = (data) => ({
    ...data,
    DiscountTypeEN: data.DiscountTypeEn,
    DiscountTypeAR: data.DiscountTypeAr,
    IsActive: data.Active
});

export const discountsApi = createDynamicApi({
    reducerPath: 'discountsApi',
    baseEndpoint: BASEURL + DISCOUNT,
    transformData: transformOfferData
});

export const {
    useGetAllQuery: useGetDiscountsQuery,
    useAddMutation: useAddDiscountMutation,
    useUpdateMutation: useUpdateDiscountMutation,
    useDeleteMutation: useDeleteDiscountMutation,
} = discountsApi;
