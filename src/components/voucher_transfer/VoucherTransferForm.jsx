import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherTransferFormFields from './VoucherTransferFormFields';
import ListVoucherTransferItem from './ListVoucherTransferItem';




const VoucherTransferForm = ({ customSubmit, onFirstSubmit, onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherTransferSchema, voucherTransferUpdatedSchema } = useValidators();

    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherTransferSchema : voucherTransferUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherTransferFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherTransferItem voucher={
                        {
                            ...defaultValuesEdit,
                            Note: watch('Note'),
                            FromWarehouse: watch('FromWarehouse'),
                            ToWarehouse: watch('ToWarehouse'),
                            TransferNo: watch('TransferNo')
                        }
                    } isAdd={isAdd} onFirstSubmit={onFirstSubmit} />
                </>
            }
        </FormComponent>
    )
}

export default VoucherTransferForm
