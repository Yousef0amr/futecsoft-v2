import React from 'react'
import AppStrings from '../../config/appStrings';
import useVoucherInputManagement from '../../hook/useVoucherInputManagement';
import EditComponent from '../../components/common/EditComponent';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const EditInputVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
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
        </Stack>
    )
}

export default EditInputVoucher
