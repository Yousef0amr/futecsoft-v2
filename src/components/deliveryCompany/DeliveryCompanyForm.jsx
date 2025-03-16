import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import DeliveryCompanyFormFields from './DeliveryCompanyFormFields'

const DeliveryCompanyForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { deliveryCompaniesSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={deliveryCompaniesSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <DeliveryCompanyFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default DeliveryCompanyForm
