import React from 'react'
import AppStrings from '../../config/appStrings';
import { useDiscountsColDefs } from '../../config/agGridColConfig';
import { routes } from '../../config/constants';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import useDiscountManagement from '../../hook/useDiscountManagement';
import ListComponent from '../../components/common/ListComponent';


const ListDiscount = () => {

    return (
        <ListComponent
            entityName="discount"
            entityKey="Serial"
            fetchHook={useDiscountManagement}
            columnDefsHook={useDiscountsColDefs}
            routes={routes.discountType}
            icon={faPercent}
            deleteSuccessMessage={AppStrings.discount_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_discounts}
            addButtonTitle={AppStrings.add_new_discount}
        />
    )
}

export default ListDiscount
