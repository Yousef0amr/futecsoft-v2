import React from 'react'
import VoucherInputItemFormFields from './VoucherInputItemFormFields'
import useValidators from '../../hooks/useValidators'
import FormComponent from '../common/FormComponent'

const VoucherInputItemForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { voucherInputSchema } = useValidators();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherInputSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherInputItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                </>
            }
        </FormComponent>
    )
}

export default VoucherInputItemForm
