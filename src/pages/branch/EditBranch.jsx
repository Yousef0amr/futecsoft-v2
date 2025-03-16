import React from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import EditComponent from '../../components/common/EditComponent';
import BranchForm from '../../components/branch/BranchForm';
import { routes } from '../../config/constants';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditBranch = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.branch_updated_successfully}
            fetchHook={useBranchManagement}
            isRefetch={true}
            icon={faShuffle}
            title={t(AppStrings.edit_branch) + '  | ' + loaction.state.BranchId}
            path={routes.branch.list}
            Form={BranchForm}
            editData={loaction.state}
        />
    )
}

export default EditBranch
