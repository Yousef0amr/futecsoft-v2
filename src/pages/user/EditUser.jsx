import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EditComponent from '../../components/common/EditComponent';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserForm from '../../components/user_management/UserForm';
import useUserManagement from '../../hook/useUserManagement';

const EditUser = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    const Branch = typeof loaction.state.Branch === 'string'
        ? loaction.state.Branch.split(',')
        : Array.isArray(loaction.state.Branch)
            ? loaction.state.Branch
            : []
    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.user_updated_successfully}
            fetchHook={useUserManagement}
            icon={faUser}
            isRefetch={true}
            title={t(AppStrings.edit_user) + '  | ' + loaction.state.UserNo}
            path={routes.user.list}
            Form={UserForm}
            editData={{ ...loaction.state, Branch }}
        />
    )
}

export default EditUser