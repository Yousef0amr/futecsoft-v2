import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import PaymentTypeFormFields from './PaymentTypeFormFields'


const PaymentTypeForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { paymentTypesSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={paymentTypesSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <PaymentTypeFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default PaymentTypeForm
