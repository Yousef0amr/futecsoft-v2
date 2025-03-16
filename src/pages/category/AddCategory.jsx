import React from 'react'
import CategoryForm from '../../components/category/CategoryForm'
import FormCard from '../../components/common/FormCard'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { useGetCurrentCategoryKeyQuery } from '../../features/categorySlice';
import useCategoryManagement from '../../hook/useCategoryManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import { routes } from '../../config/constants';
import NavButton from '../../components/common/NavButton';

const AddCategory = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, addEntityToCache } = useCategoryManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentCategoryKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: addEntityToCache,
            cacheData: data,
            successMessage: AppStrings.category_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faWindowRestore} title={t(AppStrings.add_new_category)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_categories} path={routes.category.list} />
            </>
        }  >
            <CategoryForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ Id: currentKey, Saleable: true, IsActive: true }} />
        </FormCard>
    )
}

export default AddCategory
