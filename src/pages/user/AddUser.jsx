import React from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserForm from '../../components/user_management/UserForm';
import useUserManagement from '../../hook/useUserManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { useGetCurrentUserKeyQuery } from '../../features/userSlice';


const AddUser = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch, isAddedSuccess } = useUserManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentUserKeyQuery();

    const onSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data: {
                ...data,
                UserNo: currentKey
            },

            successMessage: AppStrings.user_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faUser} title={t(AppStrings.add_new_user)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_users} path={routes.user.list} />
            </>
        }  >
            <UserForm isSuccess={isAddedSuccess} isLoading={isAdding} enableReset={true} onSubmit={onSubmit} defaultValuesEdit={{ UserNo: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddUser