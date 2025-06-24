import React from 'react'
import AppStrings from '../../config/appStrings';
import { useTranslation } from 'react-i18next';
import useUnitManagement from '../../hook/useUnitManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import { routes } from '../../config/constants';
import NavButton from '../../components/common/NavButton';
import FormCard from '../../components/common/FormCard';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { useGetCurrentUnitKeyQuery } from '../../features/unitSlice';
import UnitForm from '../../components/unit/UnitForm';

const AddUnit = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch,isAddedSuccess } = useUnitManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentUnitKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data: {
                ...data,
                UnitID: currentKey
            },
            cacheUpdater: refetch,
            cacheData: data,
            successMessage: AppStrings.unit_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faBalanceScale} title={t(AppStrings.add_new_unit)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_units} path={routes.unit.list} />
            </>
        }  >
            <UnitForm isLoading={isAdding} isSuccess={isAddedSuccess} enableReset={true} onSubmit={onSubmit} defaultValuesEdit={{  Active: true }} />
        </FormCard>
    )
}

export default AddUnit
