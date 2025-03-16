import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, REPORTS_CONTROLLER } from "../api/endpoints";
import getCookie from "../utils/getCookie";

const transformBestItemsData = (data) => {
    return {
        asset: data.Ar_Name,
        amount: data.GrandTotal
    }
}

const transformBestCategoriesData = (data) => {
    return {
        asset: data.CateName,
        amount: data.GrandTotal
    }
}

export const reportsApi = createApi({
    reducerPath: 'reportsApi',

    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + REPORTS_CONTROLLER,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers
        }


    }),
    endpoints: (builder) => ({

        getFullSales: builder.query({
            query: ({ FromDate, ToDate, Warehouse, StationID }) =>
                `/GetFullSales?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&StationID=${StationID}`,
            transformResponse: (response) => response.Response || response,
        }),
        getSalesCategory: builder.query({
            query: ({ FromDate, ToDate, Warehouse }) =>
                `/GetSalesCategory?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&FatherID=1`,
            transformResponse: (response) => response.Response || response,
        }),
        getSalesItems: builder.query({
            query: ({ FromDate, ToDate, Warehouse, StationID }) =>
                `/GetSalesItems?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&StationID=${StationID}&FatherID=1`,
            transformResponse: (response) => response.Response || response,
        }),
        getSalesByCashier: builder.query({
            query: ({ from_date, to_date, station, warehouse, cashier_no, pay_type }) =>
                `/GetSalesByCashier?FromDate=${from_date}&ToDate=${to_date}&StationID=${station}&Warehouse=${warehouse}&CashierNo=${cashier_no}&PayType=${pay_type}`,
            transformResponse: (response) => response.Response || response,
        }),
        getBestSellerItems: builder.query({
            query: ({ from_date, to_date, warehouse }) => `/BestSellerItems?FromDate=${from_date}&ToDate=${to_date}&Warehouse=${warehouse}`,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformBestItemsData(item));
                } else {
                    return [];
                }
            }
        }),
        getBestSellerCategory: builder.query({
            query: ({ from_date, to_date, warehouse }) => `/BestSellerCategory?FromDate=${from_date}&ToDate=${to_date}&Warehouse=${warehouse}`,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformBestCategoriesData(item));
                } else {
                    return [];
                }
            }
        }),
        getSalesByDays: builder.query({
            query: ({ from_date, to_date, warehouse }) =>
                `/SalesByDays?FromDate=${from_date}&ToDate=${to_date}&Warehouse=${warehouse}`,
            transformResponse: (response) => response.Response || response,
        }),
        getSalesByHours: builder.query({
            query: ({ from_date, to_date, warehouse }) =>
                `/SalesByHours?FromDate=${from_date}&ToDate=${to_date}&Warehouse=${warehouse}`,
            transformResponse: (response) => response.Response || response,
        }),
        getSalesmanSales: builder.query({
            query: ({ from_date, to_date, salesman_id }) =>
                `/SalesmanSales?FromDate=${from_date}&ToDate=${to_date}&SalesmanID=${salesman_id}`,
            transformResponse: (response) => response.Response || response,
        }),
        getReturnByInvoices: builder.query({
            query: ({ FromDate, ToDate, Warehouse, StationID, PayType }) =>
                `/ReturnByInvoices?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&StationID=${StationID}&PayType=${PayType}`,
            transformResponse: (response) => response.Response || response,
        }),
        getReturnByItems: builder.query({
            query: ({ FromDate, ToDate, Warehouse }) =>
                `/ReturnByItems?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}`,
            transformResponse: (response) => response.Response || response,
        }),
        getInvoicesByDate: builder.query({
            transformResponse: (response) => response.Response || response,
            query: ({ FromDate, ToDate, Warehouse }) => `/InvoicesByDate?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&FatherID=1`,
        }),
        getItemTransaction: builder.query({
            query: ({ FromDate, ToDate, ItemID, Warehouse }) =>
                `/ItemTransaction?FromDate=${FromDate}&ToDate=${ToDate}&ItemID=${ItemID}&Warehouse=${Warehouse}`,
            transformResponse: (response) => response.Response || response,
        }),
        getInventoryStatement: builder.query({
            query: ({ Warehouse, CateID, ToDate }) =>
                `/InventoryStatement?Warehouse=${Warehouse}&CateID=${CateID}&ToDate=${ToDate}`,
            transformResponse: (response) => response.Response || response,
        }),
        getDailyProfit: builder.query({
            query: ({ SalesDate, Warehouse }) =>
                `/GetDailyProfit?SalesDate=${SalesDate}&Warehouse=${Warehouse}`,
            transformResponse: (response) => response.Response || response,
        }),
        getItemsProfits: builder.query({
            query: ({ FromDate, ToDate, Warehouse, FatherID }) =>
                `/ItmesProfits?FromDate=${FromDate}&ToDate=${ToDate}&Warehouse=${Warehouse}&FatherID=${FatherID}`,
            transformResponse: (response) => response.Response || response,
        }),
        getItemSalesTransaction: builder.query({
            query: ({ from_date, to_date, item_id }) =>
                `/GetItemsSalesTransaction?FromDate=${from_date}&ToDate=${to_date}&ItemID=${item_id}`,
            transformResponse: (response) => response.Response || response,
        }),
    }),
});

export const {
    useLazyGetBestSellerCategoryQuery,
    useLazyGetBestSellerItemsQuery,
    useLazyGetDailyProfitQuery,
    useLazyGetFullSalesQuery,
    useLazyGetInvoicesByDateQuery,
    useLazyGetInventoryStatementQuery,
    useLazyGetItemTransactionQuery,
    useLazyGetItemsProfitsQuery,
    useLazyGetReturnByInvoicesQuery,
    useLazyGetReturnByItemsQuery,
    useLazyGetSalesByCashierQuery,
    useLazyGetSalesByDaysQuery,
    useLazyGetSalesCategoryQuery,
    useLazyGetSalesItemsQuery,
    useLazyGetSalesmanSalesQuery,
    useGetBestSellerItemsQuery,
    useGetBestSellerCategoryQuery,
    useGetSalesByDaysQuery,
    useGetSalesByHoursQuery,
} = reportsApi;
