import React from 'react'
import VoucherTransferItemFormFields from './VoucherTransferItemFormFields'
import useValidators from '../../hooks/useValidators'
import FormComponent from '../common/FormComponent'

const VoucherTransferItemForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { voucherTransferSchema } = useValidators();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherTransferSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherTransferItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                </>
            }
        </FormComponent>
    )
}

export default VoucherTransferItemForm
