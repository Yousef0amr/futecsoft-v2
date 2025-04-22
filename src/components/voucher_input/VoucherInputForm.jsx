import React from 'react'
import useValidators from '../../hooks/useValidators';
import { useTranslation } from 'react-i18next';
import FormComponent from '../common/FormComponent';
import VoucherInputFormFields from './VoucherInputFormFields';
import ListVoucherInputItem from './ListVoucherInputItem';

const VoucherInputForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherInputSchema, voucherInputUpdatedSchema } = useValidators();
    const { t } = useTranslation();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherInputSchema : voucherInputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherInputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherInputItem voucher={
                        {

                        }
                    } />

                </>
            }
        </FormComponent>
    )
}

export default VoucherInputForm