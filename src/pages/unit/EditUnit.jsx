import React from 'react'
import EditComponent from '../../components/common/EditComponent'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import { useLocation } from 'react-router-dom'
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'
import UnitForm from '../../components/unit/UnitForm'
import useUnitManagement from '../../hook/useUnitManagement'
import { routes } from '../../config/constants'

const EditUnit = () => {
    const loaction = useLocation()
    const { t } = useTranslation();


    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.unit_updated_successfully}
            fetchHook={useUnitManagement}
            icon={faBalanceScale}
            title={t(AppStrings.edit_unit) + '  | ' + loaction.state.UnitID}
            path={routes.unit.list}
            Form={UnitForm}
            editData={loaction.state}
        />
    )
}

export default EditUnit
