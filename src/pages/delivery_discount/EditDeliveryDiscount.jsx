import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EditComponent from '../../components/common/EditComponent';
import AppStrings from '../../config/appStrings';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import DeliveryDiscountForm from '../../components/deliveryCompany/DeliveryDiscountForm';
import useDeliveryDiscountManagement from '../../hook/useDeliveryDiscountManagement';

const EditDeliveryDiscount = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.delivery_discount_updated_successfully}
            fetchHook={useDeliveryDiscountManagement}
            icon={faCar}
            title={t(AppStrings.edit_delivery_discount) + '  | ' + loaction.state.LineID}
            path={routes.delivery_discount.list}
            Form={DeliveryDiscountForm}
            editData={loaction.state}
        />
    )
}

export default EditDeliveryDiscount
