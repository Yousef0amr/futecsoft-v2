import { invoiceDetailsApi, invoicesApi, useAddInvoiceMutation, useDeleteInvoiceDetailsMutation, useDeleteInvoiceMutation, useGetAllInvoiceDetailsQuery, useGetInvoicesQuery, useUpdateInvoiceDetailsMutation, useUpdateInvoiceMutation } from "../features/invoiceSlice";
import useEntityManagement from "./../hooks/useEntityManagement";

const useInvoiceManagement = () => {
    return useEntityManagement({
        apiSlice: invoicesApi,
        queryHook: useGetInvoicesQuery,
        addMutationHook: useAddInvoiceMutation,
        updateMutationHook: useUpdateInvoiceMutation,
        deleteMutationHook: useDeleteInvoiceMutation,
        cacheKey: 'getAll',
        defaultQueryArgs: {
            pageNumber: 1,
            pageSize: 10,
        },
        identifier: 'DocID'
    });
}

export const useInvoiceItemsManagement = ({ id, skip }) => {
    return useEntityManagement({
        apiSlice: invoiceDetailsApi,
        queryHook: useGetAllInvoiceDetailsQuery,
        addMutationHook: useUpdateInvoiceDetailsMutation,
        updateMutationHook: useUpdateInvoiceDetailsMutation,
        deleteMutationHook: useDeleteInvoiceDetailsMutation,
        cacheKey: 'getAllInvoiceDetails',
        defaultQueryArgs: {
            id
        },
        skip,
        identifier: 'ItemID'
    });
}

export default useInvoiceManagement
