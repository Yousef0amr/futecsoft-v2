import React from 'react'
import FormComponent from '../common/FormComponent'

import VoucherReceivingFormFields from './VoucherReceivingFormFields'
import ListVoucherReceivingItems from './ListVoucherReceivingItems'
import useValidators from '../../hooks/useValidators'

const VoucherReceivingForm = (onSubmit, isLoading, defaultValuesEdit = {}) => {
    console.log(defaultValuesEdit)
    const { voucherReceivingSchema } = useValidators();
    return (
        <FormComponent isLoading={false} defaultValues={defaultValuesEdit} schema={voucherReceivingSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherReceivingFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherReceivingItems voucher={
                        {
                            ...defaultValuesEdit,

                        }
                    } />
                </>
            }
        </FormComponent>
    )
}

export default VoucherReceivingForm
