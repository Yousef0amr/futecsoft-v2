import React, { useRef, useState } from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { defaultInvoiceItem, defaultVoucherTypes, routes } from '../../config/constants'
import InvoiceInfoForm from '../../components/invoice/InvoiceInfoForm'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import AppStrings from '../../config/appStrings'
import useInvoiceManagement, { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import { Stack } from '@mui/material'
import useEntityOperations from '../../hooks/useEntityOperations'
import { calculateItemDetails, calculateInvoiceTotals, restructureData } from '../../utils/calcInvoiceDetl'


const EditInvoice = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const { updateEntity, refetch, isUpdating } = useInvoiceManagement();
    const { refetch: refetchItems } = useInvoiceItemsManagement({ id: loaction.state?.DocID, queryParams: { refetchOnMountOrArgChange: true, } });
    const { handleEntityOperation } = useEntityOperations({ updateEntity });

    const tableRef = useRef()
    const [defaultCalData, setDefaultCalData] = useState()

    const onSubmit = async (invoice) => {
        const data = tableRef.current?.getData();
        const products = restructureData({ data, invoice })

        const val = calculateItemDetails(products, invoice)
        const totals = calculateInvoiceTotals(val)


        setDefaultCalData({
            Tax: totals.tax,
            Discount: totals.discount,
            GrandTotal: totals.netTotal,
            SubTotal: totals.subTotal
        })


        const invoiceData = {
            DocID: invoice.DocID, ...totals,
            Vtype: invoice.Vtype ?? defaultVoucherTypes.invoice,
            InvoiceNo: invoice.InvoiceNo,
            DocDate: invoice.DocDate,
            Supplier: invoice.Supplier,
            PriceIncludeTax: invoice.PriceIncludeTax,
            Note: invoice.Note,
            Warehouse: invoice.Warehouse,
            PayType: invoice.PayType,
            purchace_Invoice_Update_dtls: val
        }
        const result = await handleEntityOperation({
            operation: 'update',
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.invoice_updated_successfully,
            errorMessage: AppStrings.something_went_wrong
        })

        if (result?.Success) {
            refetchItems()
        }

        return result;
    };
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.invoice_updated_successfully}
                fetchHook={useInvoiceManagement}
                isRefetch={true}
                onSubmit={onSubmit}
                isExternalUpdate={isUpdating}
                tableRef={tableRef}
                icon={faFileInvoice}
                title={t(AppStrings.edit_invoice) + '  | ' + loaction.state.DocID}
                path={routes.invoice.list}
                Form={InvoiceInfoForm}
                editData={{ ...loaction.state, ...defaultCalData, DiscountValue: 0 }}
            />
        </Stack>
    )
}

export default EditInvoice
