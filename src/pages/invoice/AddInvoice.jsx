import React, { useState } from 'react'
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

const AddInvoice = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useInvoiceManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const [fetchKey, setFetchKey] = useState(true);
    const [triggerGetCurrentInvoiceKey, { data: currentKey }] = useGetCurrentInvoiceKeyQuery();
    const { success } = useNotification();
    const fetchData = async () => {
        await triggerGetCurrentInvoiceKey()
    }

    if (fetchKey) {
        fetchData()
        setFetchKey(false)
    }

    const onFirstSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.invoice_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    const onSave = async () => {
        fetchData()
        setFetchKey(true)
        success(t(AppStrings.opertion_saved));
    }
    return (
        <FormCard icon={faFileInvoice} title={t(AppStrings.add_new_invoice)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_invoices} path={routes.invoice.list} />
            </>
        }  >
            <InvoiceInfoForm customSubmit={true} onSubmit={onSave} isAdd={true} isLoading={isAdding} onFirstSubmit={onFirstSubmit} defaultValuesEdit={{ DocID: currentKey, DocDate: new Date().toISOString().split("T")[0], Vtype: defaultVoucherTypes.invoice, ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddInvoice
