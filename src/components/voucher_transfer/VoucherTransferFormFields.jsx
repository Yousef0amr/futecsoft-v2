import React from 'react'
import { voucherTransferFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import useBranchManagement from '../../hook/useBranchManagement'

const VoucherTransferFormFields = ({ errors, register, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    return (
        <FormFieldsComponent options={{ FromWarehouse: branches, ToWarehouse: branches.filter((item) => item.value !== watch('FromWarehouse')) }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherTransferFormFields} />
    )
}

export default VoucherTransferFormFields
