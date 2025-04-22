import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherOutputFormFields from './VoucherOutputFormFields';
import ListVoucherOutputItems from './ListVoucherOutputItems';

const VoucherOutputForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherOutputSchema, voucherOutputUpdatedSchema } = useValidators();


    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherOutputSchema : voucherOutputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>

                    <VoucherOutputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherOutputItems voucher={
                        {
                            ...defaultValuesEdit,
                        }
                    } />
                </>
            }
        </FormComponent>
    )
}

export default VoucherOutputForm
