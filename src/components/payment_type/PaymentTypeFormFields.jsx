import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { paymentTypesFormFields } from '../../config/formFields';
import useDeliveryCompanyManagement from '../../hook/useDeliveryCompanyManagement';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';



const PaymentTypeFormFields = ({ register, errors, watch, setValue }) => {
    const { data: deliveryCompanyData, isLoading: isLoadingDeliveryCompany } = useDeliveryCompanyManagement()
    const deliveryCompanies = !isLoadingDeliveryCompany
        ? deliveryCompanyData?.map((item) => ({ value: item.CompanyID, label: item.CompanyName }))
        : [];

    const { t } = useTranslation();



    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} options={{ CompanyID: [{ value: 0, label: t(AppStrings.all) }, ...deliveryCompanies] }} watch={watch} fields={paymentTypesFormFields} />
    )
}

export default PaymentTypeFormFields
