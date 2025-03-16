import React from 'react'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import usePaymentTypeManagement from '../../hook/usePaymentTypeManagement'
import { usePaymentTypesColDefs } from '../../config/agGridColConfig'
import { routes } from '../../config/constants'
import AppStrings from '../../config/appStrings'
import ListComponent from '../../components/common/ListComponent'


const ListPaymentType = () => {
    return (
        <ListComponent
            entityName="paymentType"
            entityKey="Ptype"
            fetchHook={usePaymentTypeManagement}
            columnDefsHook={usePaymentTypesColDefs}
            routes={routes.paymentMethod}
            icon={faCreditCard}
            deleteSuccessMessage={AppStrings.paymentType_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_paymentTypes}
            addButtonTitle={AppStrings.add_new_paymentType}
        />
    );
}

export default ListPaymentType
