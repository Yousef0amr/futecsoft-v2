import React from 'react'
import { voucherOutputFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import useBranchManagement from '../../hook/useBranchManagement'
import { useDefaultOutputType } from '../../config/constants'

const VoucherOutputFormFields = ({ errors, register, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    return (
        <FormFieldsComponent options={{ Warehouse: branches, OutputType: useDefaultOutputType() }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherOutputFormFields} />
    )
}

export default VoucherOutputFormFields
