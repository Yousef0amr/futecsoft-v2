import { faEdit, faUserLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import FormCard from '../../components/common/FormCard';
import AgGridTable from '../../components/common/AgGridTable';
import NavButton from '../../components/common/NavButton';
import { routes } from '../../config/constants';
import { useUserPermissionsColDefs } from '../../config/agGridColConfig';
import FilterSearch from '../../components/common/FilterSearch';
import { useGetAllUsersPermissionQuery } from '../../features/userPermissionSlice';


const ListUserPermission = () => {
    const [quickFilterText, setQuickFilterText] = useState();
    const { t } = useTranslation();
    const userPermissionsColDefs = useUserPermissionsColDefs()
    const { data, isLoading } = useGetAllUsersPermissionQuery()

    return (
        <FormCard
            icon={faUserLock}
            title={t(AppStrings.list_user_permissions)}
            optionComponent={
                <>
                    <FilterSearch onFilterTextBoxChanged={setQuickFilterText} />
                </>
            }
        >
            <AgGridTable
                actionsCellRenderer={NavButton}
                actions={{ icon: faEdit, path: routes.permission.edit, title: AppStrings.edit_permissions }}
                dynamicColumns={userPermissionsColDefs}
                rowData={data}
                isLoading={isLoading}
                quickFilterText={quickFilterText}
            />
        </FormCard>
    )
}

export default ListUserPermission