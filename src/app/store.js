import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../features/authSlice";
import { branchesApi } from "../features/branchesSlice";
import { productsApi } from "../features/productSlice";
import { categoriesApi } from "../features/categorySlice";
import { taxesApi } from "../features/taxSlice";
import { unitsApi } from "../features/unitSlice";
import { flavorsApi } from "../features/flavorsSlice";
import { offersApi } from "../features/offerSlice";
import { discountsApi } from "../features/discountSlice";
import { currenciesApi } from "../features/currencySlice";
import { deliveryCompaniesApi } from "../features/deliveryCompanySlice";
import { paymentTypesApi } from "../features/paymentTypeSlice";
import { suppliersApi } from "../features/supplierSlice";
import { deliveryDiscountApi } from "../features/deliveryDiscountSlice";
import { userGroupsApi } from "../features/userGroupSlice";
import { usersApi } from "../features/userSlice";
import { userPermissionsApi } from "../features/userPermissionSlice";
import { invoiceDetailsApi, invoicesApi } from "../features/invoiceSlice";
import { voucherInputDetailsApi, voucherInputsApi } from "../features/voucherInputSlice";
import { voucherOutputsApi, voucherOutputDetailsApi } from "../features/voucherOutputSlice";
import { voucherTransferDetailsApi, voucherTransferApi } from "../features/voucherTransferSlice";
import { reportsApi } from "../features/reportsControllerSlice";
import { posStationApi } from "../features/posStationSlice";
import { voucherProvideApi, voucherProvideDetailsApi } from "../features/voucherProvideSlice";
import { voucherRecievingApi, voucherRecievingDetailsApi } from "../features/voucherRecievingSlice";
import { purchaseOrderApi, purchaseOrderDetailsApi } from "../features/purchaseOrderSlice";


const apis = [
    authApi, branchesApi, productsApi, categoriesApi, taxesApi, unitsApi,
    flavorsApi, offersApi, discountsApi, currenciesApi, deliveryCompaniesApi,
    paymentTypesApi, suppliersApi, deliveryDiscountApi, userGroupsApi, usersApi,
    userPermissionsApi, invoicesApi, invoiceDetailsApi, voucherInputsApi,
    voucherInputDetailsApi, voucherOutputsApi, voucherOutputDetailsApi,
    voucherTransferApi, voucherTransferDetailsApi, reportsApi, posStationApi,
    voucherRecievingApi, voucherProvideApi,
    voucherProvideDetailsApi, voucherRecievingDetailsApi, purchaseOrderApi, purchaseOrderDetailsApi
];


const createRootReducer = () => {
    const apiReducers = apis.reduce((acc, api) => {
        acc[api.reducerPath] = api.reducer;
        return acc;
    }, {});

    return (state, action) => {
        if (action.type === "RESET_STATE") {
            return Object.keys(apiReducers).reduce((newState, key) => {
                newState[key] = undefined;
                return newState;
            }, {});
        }
        return Object.keys(apiReducers).reduce((newState, key) => {
            newState[key] = apiReducers[key](state?.[key], action);
            return newState;
        }, {});
    };
};

const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
});

setupListeners(store.dispatch);

export default store;
