import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import EditComponent from '../../components/common/EditComponent'
import { routes } from '../../config/constants'
import useCategoryManagement from '../../hook/useCategoryManagement'
import AppStrings from '../../config/appStrings'
import CategoryForm from '../../components/category/CategoryForm'

const EditCategory = () => {
    const loaction = useLocation()
    const { t } = useTranslation();


    const Branch = typeof loaction.state.BranchId === 'string'
        ? loaction.state.BranchId.split(',')
        : Array.isArray(loaction.state.BranchId)
            ? loaction.state.BranchId
            : []

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.category_updated_successfully}
            fetchHook={useCategoryManagement}
            icon={faWindowRestore}
            title={t(AppStrings.edit_category) + '  | ' + loaction.state.Id}
            path={routes.category.list}
            Form={CategoryForm}
            editData={{ ...loaction.state, Warehouse: Branch }}
        />
    )
}

export default EditCategory
