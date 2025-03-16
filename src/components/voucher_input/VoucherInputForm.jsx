import React from 'react'
import useValidators from '../../hooks/useValidators';
import { useTranslation } from 'react-i18next';
import FormComponent from '../common/FormComponent';
import VoucherInputFormFields from './VoucherInputFormFields';
import VoucherInputItemFormFields from './VoucherInputItemFormFields';
import AppStrings from '../../config/appStrings';

const VoucherInputForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherInputSchema, voucherInputUpdatedSchema } = useValidators();
    const { t } = useTranslation();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherInputSchema : voucherInputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherInputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    {
                        isAdd && <>
                            <p className="text-danger mt-3">{t(AppStrings.add_first_item_voucher)}</p>
                            <VoucherInputItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                        </>
                    }
                </>
            }
        </FormComponent>
    )
}

export default VoucherInputForm