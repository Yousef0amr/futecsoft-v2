import React from 'react'
import useUserGroupManagement from '../../hook/useUserGroupManagement';
import { routes } from '../../config/constants';
import { useUserGroupColDefs } from '../../config/agGridColConfig';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import AppStrings from '../../config/appStrings';
import ListComponent from '../../components/common/ListComponent';

const ListUserGroup = () => {
    return (
        <ListComponent
            entityName="user_group"
            entityKey="GroupId"
            fetchHook={useUserGroupManagement}
            columnDefsHook={useUserGroupColDefs}
            routes={routes.user_group}
            icon={faAddressBook}
            deleteSuccessMessage={AppStrings.group_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_groups}
            addButtonTitle={AppStrings.add_new_group}
        />
    )
}

export default ListUserGroup