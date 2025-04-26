import React from 'react';
import AppStrings from '../../config/appStrings';
import usePurchaseOrderManagement from '../../hook/usePurchaseOrderManagement';
import EditComponent from '../../components/common/EditComponent';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import PurchaseOrderForm from '../../components/purchase_order/PurchaseOrderForm';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';


const EditPurchaseOrder = () => {
    const location = useLocation();
    const { t } = useTranslation();


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
                Form={PurchaseOrderForm}
                editData={location.state}
            />
        </Stack>
    );
};

export default EditPurchaseOrder;
