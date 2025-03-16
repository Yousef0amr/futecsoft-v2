import React from 'react'
import useDiscountManagement from '../../hook/useDiscountManagement';
import AppStrings from '../../config/appStrings';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import EditComponent from '../../components/common/EditComponent';
import DiscountForm from '../../components/discount/DiscountForm';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';


const EditDiscount = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.discount_updated_successfully}
            fetchHook={useDiscountManagement}
            icon={faPercent}
            title={t(AppStrings.edit_discount) + '  | ' + loaction.state.Serial}
            path={routes.discountType.list}
            Form={DiscountForm}
            editData={loaction.state}
        />
    )
}

export default EditDiscount
