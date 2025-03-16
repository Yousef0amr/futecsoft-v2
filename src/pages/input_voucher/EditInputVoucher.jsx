import React from 'react'
import AppStrings from '../../config/appStrings';
import useVoucherInputManagement from '../../hook/useVoucherInputManagement';
import EditComponent from '../../components/common/EditComponent';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Button, Stack } from 'react-bootstrap';
import ListVoucherInputItem from '../../components/voucher_input/ListVoucherInputItem';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const EditInputVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false)
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherInputManagement}
                isRefetch={true}
                icon={faTruck}
                title={t(AppStrings.edit_voucher_input) + '  | ' + loaction.state.DocID}
                path={routes.input_voucher.list}
                Form={VoucherInputForm}
                editData={loaction.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>{t(AppStrings.add_item_for_voucher)}</Button>
            {
                addNew && <ListVoucherInputItem voucher={loaction.state} />
            }
        </Stack>
    )
}

export default EditInputVoucher
