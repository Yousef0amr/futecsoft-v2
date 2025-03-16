import React from 'react'
import useUnitManagement from '../../hook/useUnitManagement';
import { routes } from '../../config/constants';
import { useUnitsColDefs } from '../../config/agGridColConfig';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import AppStrings from '../../config/appStrings';
import ListComponent from '../../components/common/ListComponent';

const ListUnit = () => {
    return (
        <ListComponent
            entityName="unit"
            entityKey="UnitID"
            fetchHook={useUnitManagement}
            columnDefsHook={useUnitsColDefs}
            routes={routes.unit}
            icon={faBalanceScale}
            deleteSuccessMessage={AppStrings.unit_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_units}
            addButtonTitle={AppStrings.add_new_unit}
        />
    )
}

export default ListUnit
