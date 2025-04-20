import React from 'react';
import ListComponent from '../../components/common/ListComponent';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import usePurchaseOrderManagement from '../../hook/usePurchaseOrderManagement';
import { usePurchaseOrderColDefs } from '../../config/agGridColConfig';

const ListPurchaseOrder = () => {
    return (
        <ListComponent
            entityName="purchase_order"
            entityKey="DocID"
            fetchHook={usePurchaseOrderManagement}
            columnDefsHook={usePurchaseOrderColDefs}
            routes={routes.purchase_order}
            icon={faFileInvoiceDollar}
            deleteSuccessMessage={AppStrings.purchase_order_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_purchase_orders}
            addButtonTitle={AppStrings.add_new_purchase_order}
            optionId="Warehouse"
        />
    );
};

export default ListPurchaseOrder;
