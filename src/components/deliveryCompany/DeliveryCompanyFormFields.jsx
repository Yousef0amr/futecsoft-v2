import React from 'react'
import { deliveryCompaniesFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { useDefaultPriceCategory } from '../../config/constants'


const DeliveryCompanyFormFields = ({ register, errors, watch, setValue }) => {
    return (
        <FormFieldsComponent errors={errors} register={register} options={{ PriceCategory: useDefaultPriceCategory() }} setValue={setValue} watch={watch} fields={deliveryCompaniesFormFields} />
    )
}

export default DeliveryCompanyFormFields