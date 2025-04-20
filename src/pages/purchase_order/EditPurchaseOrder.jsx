import React, { useState } from 'react';
import AppStrings from '../../config/appStrings';
import usePurchaseOrderManagement from '../../hook/usePurchaseOrderManagement';
import EditComponent from '../../components/common/EditComponent';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Button, Stack } from 'react-bootstrap';
import ListVoucherInputItem from '../../components/voucher_input/ListVoucherInputItem';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditPurchaseOrder = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false);

    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={usePurchaseOrderManagement}
                isRefetch={true}
                icon={faFileInvoiceDollar}
                title={t(AppStrings.edit_purchase_order) + ' | ' + location.state.DocID}
                path={routes.purchase_order.list}
                Form={VoucherInputForm}
                editData={location.state}
            />
            <Button variant="success" onClick={() => setAddNew(!addNew)}>
                {t(AppStrings.add_item_for_invoice)}
            </Button>
            {addNew && <ListVoucherInputItem voucher={location.state} />}
        </Stack>
    );
};

export default EditPurchaseOrder;
