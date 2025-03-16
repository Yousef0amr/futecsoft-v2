import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import AppStrings from '../../config/appStrings'
import { permissionsDefaultValues, routes } from '../../config/constants'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import FormCard from '../../components/common/FormCard'
import NavButton from '../../components/common/NavButton'
import UserPermissionForm from '../../components/user_management/UserPermissionForm'
import { useAddUserPermissionMutation, useGetAllUserPermissionsQuery } from '../../features/userPermissionSlice'
import useEntityOperations from '../../hooks/useEntityOperations'


const EditUserPermission = () => {
    const { t } = useTranslation()
    const location = useLocation();
    const { data: permissionsData, isLoading, refetch } = useGetAllUserPermissionsQuery({ id: location.state.UserNo })
    const [addUserPermission, { isLoading: isAdding }] = useAddUserPermissionMutation()
    const { handleEntityOperation } = useEntityOperations({ updateEntity: addUserPermission })

    const permissions = !isLoading && permissionsData ?
        permissionsData.reduce((acc, item) => {
            acc[item.PermissionId] = item.Allow;
            return acc;
        }, {}) : permissionsDefaultValues;

    const onSubmit = async (data) => {
        const userPermissions = Object.entries(data).map(([key, value]) => ({
            UserNo: location.state.UserNo,
            WarehouseId: Number(location.state.Branch),
            PermissionId: key,
            Allow: value
        }));

        handleEntityOperation({
            operation: 'update',
            data: { Insert: userPermissions },
            cacheUpdater: refetch,
            successMessage: AppStrings.user_permissions_updated_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faUserLock} title={t(AppStrings.edit_user_permission) + " | " + location.state.UserNo} navButton={<NavButton icon={faArrowRight} title={AppStrings.back} path={routes.permission.list} />}>
            <UserPermissionForm isLoading={isAdding} defaultValuesEdit={permissions} onSubmit={onSubmit} />
        </FormCard>
    )
}

export default EditUserPermission