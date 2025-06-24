import React from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import UserGroupForm from '../../components/user_management/UserGroupForm';
import useUserGroupManagement from '../../hook/useUserGroupManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { useGetCurrentUserGroupKeyQuery } from '../../features/userGroupSlice';

const AddUserGroup = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch, isAddedSuccess } = useUserGroupManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentUserGroupKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data: {
                ...data,
                GroupId: currentKey
            },
            cacheUpdater: refetch,
            cacheData: data,
            successMessage: AppStrings.group_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faAddressBook} title={t(AppStrings.add_new_group)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_groups} path={routes.user_group.list} />
            </>
        }  >
            <UserGroupForm isLoading={isAdding} isSuccess={isAddedSuccess} enableReset={true} onSubmit={onSubmit} defaultValuesEdit={{ GroupId: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddUserGroup
