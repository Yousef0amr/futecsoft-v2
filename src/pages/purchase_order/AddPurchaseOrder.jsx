import React from 'react';
import usePurchaseOrderManagement from '../../hook/usePurchaseOrderManagement';
import { useTranslation } from 'react-i18next';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { defaultVoucherTypes, routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentPurchaseOrderKeyQuery } from '../../features/purchaseOrderSlice';
import AppStrings from '../../config/appStrings';
import PurchaseOrderForm from '../../components/purchase_order/PurchaseOrderForm';

const AddPurchaseOrder = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = usePurchaseOrderManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentPurchaseOrderKeyQuery();

    const onFirstSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.purchase_order_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faFileInvoiceDollar} title={t(AppStrings.add_new_purchase_order)} optionComponent={
            <NavButton icon={'list'} title={AppStrings.list_purchase_orders} path={routes.purchase_order.list} />
        }>
            <PurchaseOrderForm
                isAdd={true}
                isLoading={isAdding}
                customSubmit={true}
                onFirstSubmit={onFirstSubmit}
                defaultValuesEdit={{
                    DocID: currentKey,
                    LineDate: new Date().toISOString().split("T")[0],
                    Vtype: defaultVoucherTypes.purchaseOrder,
                }}
            />
        </FormCard>
    )
}

export default AddPurchaseOrder;
