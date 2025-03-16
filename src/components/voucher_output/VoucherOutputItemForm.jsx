import React from 'react'
import VoucherOutputItemFormFields from './VoucherOutputItemFormFields'
import useValidators from '../../hooks/useValidators'
import FormComponent from '../common/FormComponent'

const VoucherOutputItemForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { voucherOutputSchema } = useValidators();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherOutputSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherOutputItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                </>
            }
        </FormComponent>
    )
}

export default VoucherOutputItemForm
