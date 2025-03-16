import React from 'react'
import { useTranslation } from 'react-i18next';
import useEntityOperations from '../../hooks/useEntityOperations';
import AppStrings from '../../config/appStrings';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import useDeliveryDiscountManagement from '../../hook/useDeliveryDiscountManagement';
import DeliveryDiscountForm from '../../components/deliveryCompany/DeliveryDiscountForm';
import { useGetCurrentKeyQuery } from '../../features/deliveryDiscountSlice';

const AddDeliveryDiscount = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useDeliveryDiscountManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.delivery_discount_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faCar} title={t(AppStrings.add_new_delivery_discount)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_delivery_discount} path={routes.delivery_discount.list} />
            </>
        }  >
            <DeliveryDiscountForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ LineID: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddDeliveryDiscount
