import React, { useState } from 'react';
import AppStrings from '../../config/appStrings';
import useVoucherRecievingManagement from '../../hook/useVoucherRecievingManagement';
import EditComponent from '../../components/common/EditComponent';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Button, Stack } from 'react-bootstrap';
import ListVoucherInputItem from '../../components/voucher_input/ListVoucherInputItem';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditReceivingVoucher = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false);

    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherRecievingManagement}
                isRefetch={true}
                icon={faArrowDown}
                title={t(AppStrings.edit_voucher_receiving) + ' | ' + location.state.DocID}
                path={routes.recieving_voucher.list}
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

export default EditReceivingVoucher;
