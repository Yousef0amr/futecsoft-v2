import React from 'react'
import { faVcard } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import useSupplierManagement from '../../hook/useSupplierManagement';
import SupplierForm from './../../components/supplier/SupplierForm';
import useEntityOperations from '../../hooks/useEntityOperations';
import { routes } from '../../config/constants';
import FormCard from '../../components/common/FormCard';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import { useGetCurrentSupplierKeyQuery } from '../../features/supplierSlice';


const AddSupplier = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useSupplierManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentSupplierKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.supplier_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faVcard} title={t(AppStrings.add_new_supplier)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_suppliers} path={routes.supplier.list} />
            </>
        }  >
            <SupplierForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ SupplierId: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddSupplier
