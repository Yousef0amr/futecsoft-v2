import React from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import { suppliersFormFields } from '../../config/formFields';
import FormFieldsComponent from '../common/FormFieldsComponent';


const SupplierFormFields = ({ register, errors, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];
    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} options={{ Warehouse: branches }} watch={watch} fields={suppliersFormFields} />
    )
}

export default SupplierFormFields
