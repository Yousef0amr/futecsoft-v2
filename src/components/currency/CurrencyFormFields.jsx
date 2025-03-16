import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { currenciesFormFields } from '../../config/formFields'

const CurrencyFormFields = ({ register, errors, watch, setValue }) => {
    return (
        <FormFieldsComponent errors={errors} register={register} watch={watch} setValue={setValue} fields={currenciesFormFields} />
    )
}

export default CurrencyFormFields