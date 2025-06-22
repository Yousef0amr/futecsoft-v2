import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherTransferFormFields from './VoucherTransferFormFields';
import ListVoucherTransferItem from './ListVoucherTransferItem';




const VoucherTransferForm = ({ tableRef, onFirstSubmit, onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherTransferSchema, voucherTransferUpdatedSchema } = useValidators();

    return (
        <FormComponent  isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherTransferUpdatedSchema} onSubmit={onSubmit}>
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
                    } isAdd={isAdd} tableRef={tableRef} />
                </>
            }
        </FormComponent>
    )
}

export default VoucherTransferForm
