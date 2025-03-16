import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EditComponent from '../../components/common/EditComponent';
import AppStrings from '../../config/appStrings';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import DeliveryCompanyForm from '../../components/deliveryCompany/DeliveryCompanyForm';
import useDeliveryCompanyManagement from '../../hook/useDeliveryCompanyManagement';

const EditDeliveryCompany = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.deliveryCompany_updated_successfully}
            fetchHook={useDeliveryCompanyManagement}
            icon={faCar}
            title={t(AppStrings.edit_deliveryCompany) + '  | ' + loaction.state.CompanyID}
            path={routes.delivery_company.list}
            Form={DeliveryCompanyForm}
            editData={loaction.state}
        />
    )
}

export default EditDeliveryCompany
