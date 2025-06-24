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
    const location = useLocation()
    const { t } = useTranslation();
const Branch = typeof location.state.Warehouse === 'string'
  ? location.state.Warehouse.split(',')
  : Array.isArray(location.state.Warehouse)
    ? location.state.Warehouse
    : [];
    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.supplier_updated_successfully}
            fetchHook={useSupplierManagement}
            icon={faVcard}
            title={t(AppStrings.edit_supplier) + '  | ' + location.state.SupplierId}
            path={routes.supplier.list}
            Form={SupplierForm}
            editData={{ ...location.state, Warehouse:Branch }}
        />
    )
}

export default EditSupplier
