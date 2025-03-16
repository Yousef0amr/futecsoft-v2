import React from 'react'
import { faVcard } from '@fortawesome/free-solid-svg-icons'
import useSupplierManagement from '../../hook/useSupplierManagement'
import { useSuppliersColDefs } from '../../config/agGridColConfig'
import { routes } from '../../config/constants'
import AppStrings from '../../config/appStrings'
import ListComponent from '../../components/common/ListComponent'


const ListSupplier = () => {
    return (
        <ListComponent
            entityName="supplier"
            entityKey="SupplierId"
            fetchHook={useSupplierManagement}
            columnDefsHook={useSuppliersColDefs}
            routes={routes.supplier}
            icon={faVcard}
            deleteSuccessMessage={AppStrings.supplier_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_suppliers}
            addButtonTitle={AppStrings.add_new_supplier}
        />
    );
}

export default ListSupplier
