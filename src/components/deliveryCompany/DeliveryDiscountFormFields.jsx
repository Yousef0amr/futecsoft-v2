import React from 'react'
import { deliveryDiscountFormFields } from '../../config/formFields';
import FormFieldsComponent from '../common/FormFieldsComponent';
import useBranchManagement from '../../hook/useBranchManagement';
import useDeliveryCompanyManagement from '../../hook/useDeliveryCompanyManagement';

const DeliveryDiscountFormFields = ({ register, errors, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    const { data: deliveryCompanyData, isLoading: isLoadingDeliveryCompany } = useDeliveryCompanyManagement()
    const Companies = !isLoadingDeliveryCompany
        ? deliveryCompanyData?.map((item) => ({ value: item.CompanyID, label: item.CompanyName }))
        : [];


    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} options={{ BranchID: branches, CompanyID: Companies }} watch={watch} fields={deliveryDiscountFormFields} />
    )
}

export default DeliveryDiscountFormFields