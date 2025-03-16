import React from 'react'
import AppStrings from '../../config/appStrings';
import useVoucherTransferManagement from '../../hook/useVoucherTransferManagement';
import EditComponent from '../../components/common/EditComponent';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherTransferForm from '../../components/voucher_transfer/VoucherTransferForm';
import { Button, Stack } from 'react-bootstrap';
import ListVoucherTransferItem from '../../components/voucher_transfer/ListVoucherTransferItem';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditTransferVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false)
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherTransferManagement}
                isRefetch={true}
                icon={faTruck}
                title={t(AppStrings.edit_voucher_transfer) + '  | ' + loaction.state.DocNo}
                path={routes.transfer_voucher.list}
                Form={VoucherTransferForm}
                editData={loaction.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>{t(AppStrings.add_item_for_voucher)}</Button>
            {
                addNew && <ListVoucherTransferItem voucher={loaction.state} />
            }
        </Stack>
    )
}

export default EditTransferVoucher
