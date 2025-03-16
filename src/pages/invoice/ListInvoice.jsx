import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import useInvoiceManagement from '../../hook/useInvoiceManagement'
import AppStrings from '../../config/appStrings'
import { useInvoicesColDefs } from '../../config/agGridColConfig'
import { routes } from '../../config/constants'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

const ListInvoice = () => {
    return (
        <ListComponent
            entityName="invoice"
            entityKey="DocID"
            fetchHook={useInvoiceManagement}
            columnDefsHook={useInvoicesColDefs}
            routes={routes.invoice}
            icon={faFileInvoice}
            deleteSuccessMessage={AppStrings.invoice_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_invoices}
            addButtonTitle={AppStrings.add_new_invoice}
            optionId={"Warehouse"}
        />
    )
}

export default ListInvoice
