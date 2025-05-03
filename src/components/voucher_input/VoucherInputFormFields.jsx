import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { voucherInputFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
import  usePaymentTypeManagement  from '../../hook/usePaymentTypeManagement'
const VoucherInputFormFields = ({ errors, register, watch, setValue }) => {

    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];
        const { data: payTypesData, isLoading: isLoadingPayTypes } = usePaymentTypeManagement()
        const payTypes = !isLoadingPayTypes
            ? payTypesData?.map((item) => ({ value: item.Ptype.toString(), label: item.PaymentArDesc }))
            : [];


    return (
        <FormFieldsComponent options={{ Warehouse: branches , PayType: payTypes}} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherInputFormFields} />
    )
}

export default VoucherInputFormFields
