import React from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../config/constants'
import InvoiceInfoForm from '../../components/invoice/InvoiceInfoForm'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import AppStrings from '../../config/appStrings'
import useInvoiceManagement, { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'

import { Stack } from '@mui/material'
import useEntityOperations from '../../hooks/useEntityOperations'


const EditInvoice = () => {
    const loaction = useLocation()
    const { t } = useTranslation();


    const { addEntity, refetch } = useInvoiceItemsManagement({
        id: loaction.state?.DocID
    });
    const { handleEntityOperation } = useEntityOperations({ addEntity });

    const onFirstSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.invoice_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }


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
        </Stack>
    )
}

export default EditInvoice
