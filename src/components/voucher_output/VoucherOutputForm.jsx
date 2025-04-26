import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherOutputFormFields from './VoucherOutputFormFields';
import ListVoucherOutputItems from './ListVoucherOutputItems';

const VoucherOutputForm = ({ customSubmit, onFirstSubmit, onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherOutputSchema, voucherOutputUpdatedSchema } = useValidators();


    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherOutputSchema : voucherOutputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>

                    <VoucherOutputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherOutputItems isAdd={isAdd} onFirstSubmit={onFirstSubmit} voucher={
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
