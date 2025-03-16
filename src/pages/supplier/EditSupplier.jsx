import React from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faVcard } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { routes } from '../../config/constants'
import { useTranslation } from 'react-i18next'
import SupplierForm from '../../components/supplier/SupplierForm'
import useSupplierManagement from '../../hook/useSupplierManagement'
import AppStrings from '../../config/appStrings'

const EditSupplier = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.supplier_updated_successfully}
            fetchHook={useSupplierManagement}
            icon={faVcard}
            title={t(AppStrings.edit_supplier) + '  | ' + loaction.state.SupplierId}
            path={routes.supplier.list}
            Form={SupplierForm}
            editData={{ ...loaction.state, Warehouse: loaction.state.Warehouse.split(',') }}
        />
    )
}

export default EditSupplier
