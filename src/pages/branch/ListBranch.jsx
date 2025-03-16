import React from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AppStrings from '../../config/appStrings';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useBranchColDefs } from '../../config/agGridColConfig';
import useBranchManagement from '../../hook/useBranchManagement';
import { routes } from '../../config/constants';
import ListComponent from '../../components/common/ListComponent';


const ListBranch = () => {
    return (
        <ListComponent
            entityName="branch"
            entityKey="BranchId"
            fetchHook={useBranchManagement}
            columnDefsHook={useBranchColDefs}
            routes={routes.branch}
            icon={faShuffle}
            deleteSuccessMessage={AppStrings.branch_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_branches}
            addButtonTitle={AppStrings.add_new_branch}
        />
    );
};

export default ListBranch;
