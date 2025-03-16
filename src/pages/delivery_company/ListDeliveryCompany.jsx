import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import AppStrings from '../../config/appStrings';
import useDeliveryCompanyManagement from '../../hook/useDeliveryCompanyManagement';
import { useDeliveryCompaniesColDefs } from '../../config/agGridColConfig';
import { routes } from '../../config/constants';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const ListDeliveryCompany = () => {
    return (
        <ListComponent
            entityName="delivery_company"
            entityKey="CompanyID"
            fetchHook={useDeliveryCompanyManagement}
            columnDefsHook={useDeliveryCompaniesColDefs}
            routes={routes.delivery_company}
            icon={faCar}
            deleteSuccessMessage={AppStrings.deliveryCompany_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_deliveryCompanies}
            addButtonTitle={AppStrings.add_new_deliveryCompany}
        />
    )
}

export default ListDeliveryCompany
