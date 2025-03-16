import React, { useState } from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../config/constants'
import InvoiceInfoForm from '../../components/invoice/InvoiceInfoForm'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import AppStrings from '../../config/appStrings'
import useInvoiceManagement from '../../hook/useInvoiceManagement'
import { Stack } from '@mui/material'
import { Button } from 'react-bootstrap'
import ListInvoiceItems from '../../components/invoice/ListInvoiceItems'


const EditInvoice = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false)
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.invoice_updated_successfully}
                fetchHook={useInvoiceManagement}
                isRefetch={true}
                icon={faFileInvoice}
                title={t(AppStrings.edit_invoice) + '  | ' + loaction.state.DocID}
                path={routes.invoice.list}
                Form={InvoiceInfoForm}
                editData={loaction.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>{t(AppStrings.add_item_for_invoice)}</Button>
            {
                addNew && <ListInvoiceItems invoice={loaction.state} />
            }
        </Stack>
    )
}

export default EditInvoice
