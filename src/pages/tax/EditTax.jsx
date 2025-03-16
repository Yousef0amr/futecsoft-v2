import React from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faUsd } from '@fortawesome/free-solid-svg-icons'
import useTaxManagement from '../../hook/useTaxManagement'
import { useLocation } from 'react-router-dom'
import { routes } from '../../config/constants'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import TaxForm from '../../components/tax/TaxForm'

const EditTax = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.tax_updated_successfully}
            fetchHook={useTaxManagement}
            icon={faUsd}
            title={t(AppStrings.edit_tax) + '  | ' + loaction.state.TaxId}
            path={routes.tax.list}
            Form={TaxForm}
            editData={loaction.state}
        />
    )
}

export default EditTax
