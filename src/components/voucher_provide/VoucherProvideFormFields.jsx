import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { voucherProvideFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'

const VoucherProvideFormFields = ({ errors, register, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    return (
        <FormFieldsComponent options={{ FromWarehouse: branches, Warehouse: branches.filter((item) => item.value !== watch('FromWarehouse')) }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherProvideFormFields} />
    )
}

export default VoucherProvideFormFields