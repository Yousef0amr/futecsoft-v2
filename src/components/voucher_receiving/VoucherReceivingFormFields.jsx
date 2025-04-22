import React from 'react'
import { voucherRecievingFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import useBranchManagement from '../../hook/useBranchManagement'

const VoucherReceivingFormFields = ({ register, errors, setValue, watch }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];
    return (
        <FormFieldsComponent options={{ FromWarehouse: branches, Warehouse: branches.filter((item) => item.value !== watch('FromWarehouse')) }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherRecievingFormFields} />
    )
}

export default VoucherReceivingFormFields
