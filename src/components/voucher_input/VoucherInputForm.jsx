import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherInputFormFields from './VoucherInputFormFields';
import ListVoucherInputItem from './ListVoucherInputItem';

const VoucherInputForm = ({ isSuccess, enableReset, tableRef ,onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherInputSchema, voucherInputUpdatedSchema } = useValidators();

    return (
        <FormComponent isSuccess={isSuccess} enableReset={enableReset}  isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherInputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <div className='w-100'>
                    <VoucherInputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherInputItem tableRef={tableRef} isAdd={isAdd}  voucher={
                        {
                            ...defaultValuesEdit,
                            Note: watch('Note'),
                            Warehouse: watch('Warehouse')
                        }
                    } />

                </div>
            }
        </FormComponent>
    )
}

export default VoucherInputForm