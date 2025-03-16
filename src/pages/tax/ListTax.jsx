import React from 'react'
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faUsd } from '@fortawesome/free-solid-svg-icons';
import useTaxManagement from '../../hook/useTaxManagement';
import { useTaxsColDefs } from '../../config/agGridColConfig';
import ListComponent from '../../components/common/ListComponent';

const ListTax = () => {




    return (

        <ListComponent
            entityName="tax"
            entityKey="TaxId"
            fetchHook={useTaxManagement}
            columnDefsHook={useTaxsColDefs}
            routes={routes.tax}
            icon={faUsd}
            deleteSuccessMessage={AppStrings.tax_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_taxes}
            addButtonTitle={AppStrings.add_new_tax}
        />
    );
}

export default ListTax
