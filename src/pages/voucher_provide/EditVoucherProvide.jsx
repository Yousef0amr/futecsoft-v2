import React, { useState } from 'react';
import AppStrings from '../../config/appStrings';
import useVoucherProvideManagement from '../../hook/useVoucherProvideManagement';
import EditComponent from '../../components/common/EditComponent';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Button, Stack } from 'react-bootstrap';
import ListVoucherInputItem from '../../components/voucher_input/ListVoucherInputItem';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditProvideVoucher = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false);

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
                Form={VoucherInputForm}
                editData={location.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>
                {t(AppStrings.add_item_for_voucher)}
            </Button>
            {addNew && <ListVoucherInputItem voucher={location.state} />}
        </Stack>
    );
};

export default EditProvideVoucher;
