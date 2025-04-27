import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { voucherInputFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
const VoucherInputFormFields = ({ errors, register, watch, setValue }) => {

    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    console.log(errors)

    return (
        <FormFieldsComponent options={{ Warehouse: branches }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherInputFormFields} />
    )
}

export default VoucherInputFormFields
