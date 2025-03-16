import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EditComponent from '../../components/common/EditComponent';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import UserGroupForm from '../../components/user_management/UserGroupForm';
import useUserGroupManagement from '../../hook/useUserGroupManagement';

const EditUserGroup = () => {
    const loaction = useLocation()
    const { t } = useTranslation();


    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.group_updated_successfully}
            fetchHook={useUserGroupManagement}
            isRefetch={true}
            icon={faAddressBook}
            title={t(AppStrings.edit_group) + '  | ' + loaction.state.GroupId}
            path={routes.user_group.list}
            Form={UserGroupForm}
            editData={loaction.state}
        />
    )
}

export default EditUserGroup