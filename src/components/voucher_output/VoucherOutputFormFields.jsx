import React from 'react'
import { voucherOutputFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import useBranchManagement from '../../hook/useBranchManagement'
import { useGetVoucherOutputTypesQuery } from '../../features/voucherOutputSlice'
const VoucherOutputFormFields = ({ errors, register, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];
    const { data: outputTypesData, isLoading: isLoadingOutputTypes } = useGetVoucherOutputTypesQuery()
    const outputTypes = !isLoadingOutputTypes
        ? outputTypesData?.map((item) => ({ value: item.Id.toString(), label: item.TypeAr }))
        : [];
    return (
        <FormFieldsComponent options={{ Warehouse: branches, OutputType: outputTypes }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherOutputFormFields} />
    )
}

export default VoucherOutputFormFields
