import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import AppStrings from '../../config/appStrings';
import useDeliveryDiscountManagement from './../../hook/useDeliveryDiscountManagement';
import { useDeliveryDiscountColDefs } from '../../config/agGridColConfig';
import { routes } from '../../config/constants';
import { faCar } from '@fortawesome/free-solid-svg-icons';


const ListDeliveryDiscount = () => {
    return (
        <ListComponent
            entityName="delivery_discount"
            entityKey="LineID"
            fetchHook={useDeliveryDiscountManagement}
            columnDefsHook={useDeliveryDiscountColDefs}
            routes={routes.delivery_discount}
            icon={faCar}
            deleteSuccessMessage={AppStrings.delivery_discount_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_delivery_discount}
            addButtonTitle={AppStrings.add_new_delivery_discount}
        />
    )
}

export default ListDeliveryDiscount
