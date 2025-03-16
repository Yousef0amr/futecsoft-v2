import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Stack } from 'react-bootstrap'
import AppStrings from '../../config/appStrings';
import useVoucherOutputManagement from '../../hook/useVoucherOutputManagement';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import EditComponent from '../../components/common/EditComponent';
import VoucherOutputForm from '../../components/voucher_output/VoucherOutputForm';
import ListVoucherOutputItems from '../../components/voucher_output/ListVoucherOutputItems';
import { routes } from '../../config/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditOutputVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false)
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherOutputManagement}
                isRefetch={true}
                icon={faTruck}
                title={t(AppStrings.edit_voucher_output) + '  | ' + loaction.state.DocNo}
                path={routes.output_voucher.list}
                Form={VoucherOutputForm}
                editData={loaction.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>{t(AppStrings.add_item_for_voucher)}</Button>
            {
                addNew && <ListVoucherOutputItems voucher={loaction.state} />
            }
        </Stack>
    )
}

export default EditOutputVoucher
