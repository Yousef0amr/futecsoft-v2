import React from 'react'
import AppStrings from '../../config/appStrings';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import useCurrencyManagment from '../../hook/useCurrencyManagment';
import { useCurrenciesColDefs } from '../../config/agGridColConfig';
import { routes } from '../../config/constants';
import ListComponent from '../../components/common/ListComponent';


const ListCurreny = () => {
    return (
        <ListComponent
            entityName="currency"
            entityKey="CurrencyId"
            fetchHook={useCurrencyManagment}
            columnDefsHook={useCurrenciesColDefs}
            routes={routes.currency}
            icon={faMoneyBill}
            deleteSuccessMessage={AppStrings.discount_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_discounts}
            addButtonTitle={AppStrings.add_new_currency}
        />
    )
}

export default ListCurreny