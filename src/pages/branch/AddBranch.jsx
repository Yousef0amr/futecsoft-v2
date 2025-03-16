import React from 'react'
import FormCard from '../../components/common/FormCard'
import BranchForm from '../../components/branch/BranchForm'
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { useGetCurrentBranchKeyQuery } from '../../features/branchesSlice';
import NavButton from '../../components/common/NavButton';
import { routes } from '../../config/constants';
import useBranchManagement from '../../hook/useBranchManagement';
import useEntityOperations from '../../hooks/useEntityOperations';

const AddBranch = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, addEntityToCache } = useBranchManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentBranchKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: addEntityToCache,
            cacheData: data,
            successMessage: AppStrings.branch_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faShuffle} title={t(AppStrings.add_new_branch)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_branches} path={routes.branch.list} />
            </>
        }  >
            <BranchForm isLoading={isAdding} onSubmit={onSubmit} defaultValuesEdit={{ BranchId: currentKey }} />
        </FormCard>
    )
}

export default AddBranch
