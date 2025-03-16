import React from 'react'
import useUserManagement from '../../hook/useUserManagement';
import { routes } from '../../config/constants';
import { useUsersColDefs } from '../../config/agGridColConfig';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AppStrings from '../../config/appStrings';
import ListComponent from '../../components/common/ListComponent';

const ListUser = () => {
    return (
        <ListComponent
            entityName="user"
            entityKey="UserNo"
            fetchHook={useUserManagement}
            columnDefsHook={useUsersColDefs}
            routes={routes.user}
            icon={faUser}
            deleteSuccessMessage={AppStrings.user_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_users}
            addButtonTitle={AppStrings.add_new_user}
        />
    )
}

export default ListUser