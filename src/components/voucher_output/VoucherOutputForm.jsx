import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherOutputFormFields from './VoucherOutputFormFields';
import ListVoucherOutputItems from './ListVoucherOutputItems';

const VoucherOutputForm = ({ tableRef, onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherOutputSchema, voucherOutputUpdatedSchema } = useValidators();


    return (
        <FormComponent  isLoading={isLoading} defaultValues={defaultValuesEdit} schema={ voucherOutputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>

                    <VoucherOutputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherOutputItems tableRef={tableRef} isAdd={isAdd}  voucher={
                        {
                            ...defaultValuesEdit,
                            Note: watch('Note'),
                            Warehouse: watch('Warehouse'),
                            OutputType: watch('OutputType')

                        }
                    } />
                </>
            }
        </FormComponent>
    )
}

export default VoucherOutputForm
