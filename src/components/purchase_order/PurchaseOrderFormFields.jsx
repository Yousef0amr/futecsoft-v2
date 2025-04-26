import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { purchaseOrderFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'

const PurchaseOrderFormFields = ({ register, errors, setValue, watch }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];
    return (
        <FormFieldsComponent fields={purchaseOrderFormFields} options={{ Warehouse: branches }} setValue={setValue} errors={errors} register={register} watch={watch} />
    )
}

export default PurchaseOrderFormFields