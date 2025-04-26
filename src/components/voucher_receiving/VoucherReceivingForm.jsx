import React from 'react'
import FormComponent from '../common/FormComponent'

import VoucherReceivingFormFields from './VoucherReceivingFormFields'
import ListVoucherReceivingItems from './ListVoucherReceivingItems'
import useValidators from '../../hooks/useValidators'

const VoucherReceivingForm = ({ onFirstSubmit, isAdd, customSubmit, onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { voucherReceivingSchema } = useValidators();

    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherReceivingSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherReceivingFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherReceivingItems isAdd={isAdd} onFirstSubmit={onFirstSubmit} voucher={
                        {
                            ...defaultValuesEdit,
                            Warehouse: watch('Warehouse'),
                            FromWarehouse: watch('FromWarehouse'),
                            Note: watch('Note'),
                            Reciever: watch('Reciever'),
                            Sender: watch('Sender'),
                            DocDate: watch('DocDate'),
                            SourceID: watch('SourceID')
                        }
                    } />
                </>
            }
        </FormComponent>
    )
}

export default VoucherReceivingForm
