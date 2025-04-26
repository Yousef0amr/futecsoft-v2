import React from 'react';
import AppStrings from '../../config/appStrings';
import useVoucherProvideManagement from '../../hook/useVoucherProvideManagement';
import EditComponent from '../../components/common/EditComponent';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherProvideForm from '../../components/voucher_provide/VoucherProvideForm';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';

const EditProvideVoucher = () => {
    const location = useLocation();
    const { t } = useTranslation();


    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherProvideManagement}
                isRefetch={true}
                icon={faArrowRight}
                title={t(AppStrings.edit_voucher_provide) + ' | ' + location.state.ReqNo}
                path={routes.provide_voucher.list}
                Form={VoucherProvideForm}
                editData={location.state}
            />
        </Stack>
    );
};

export default EditProvideVoucher;
