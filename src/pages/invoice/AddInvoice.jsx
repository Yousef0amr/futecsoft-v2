import React, { useRef, useState } from 'react'
import useInvoiceManagement from '../../hook/useInvoiceManagement';
import { useTranslation } from 'react-i18next';

import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import FormCard from '../../components/common/FormCard';
import InvoiceInfoForm from '../../components/invoice/InvoiceInfoForm';
import { defaultInvoiceItem, defaultVoucherTypes, routes } from '../../config/constants';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentInvoiceKeyQuery } from '../../features/invoiceSlice';
import useNotification from '../../hooks/useNotification';
import { calculateItemDetails, calculateInvoiceTotals,restructureData } from '../../utils/calcInvoiceDetl'
const AddInvoice = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch, isAddedSuccess } = useInvoiceManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const  { data: currentKey } = useGetCurrentInvoiceKeyQuery();
    const { success } = useNotification();
    const tableRef = useRef()
    

    const [defaultCalData,setDefaultCalData] = useState()

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
                DocID: currentKey
                , ...totals,
                Vtype: invoice.Vtype,
                InvoiceNo: invoice.InvoiceNo,
                DocDate: invoice.DocDate,
                Supplier: invoice.Supplier,
                PriceIncludeTax: invoice.PriceIncludeTax,
                Note: invoice.Note,
                Warehouse: invoice.Warehouse,
                PayType: invoice.PayType,
                purchase_Invoice_Insert_Details: val
            }
                const result = await handleEntityOperation({
            operation: 'add',
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.invoice_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })

        if (result?.Success) {
            tableRef.current?.resetTable()
            
        }

                return result;
        };
    

    return (
        <FormCard icon={faFileInvoice} title={t(AppStrings.add_new_invoice)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_invoices} path={routes.invoice.list} />
            </>
        }  >
            <InvoiceInfoForm  tableRef={tableRef} isSuccess={isAddedSuccess} enableReset={true} isAdd={true} isLoading={isAdding} onSubmit={onSubmit}  defaultValuesEdit={{ DocID: currentKey, DocDate: new Date().toISOString().split("T")[0], Vtype: defaultVoucherTypes.invoice , ...defaultCalData,DiscountValue: 0 }} />
        </FormCard>
    )
}

export default AddInvoice
