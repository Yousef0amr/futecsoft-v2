import React from 'react'
import useValidators from '../../hooks/useValidators';
import { useTranslation } from 'react-i18next';
import FormComponent from '../common/FormComponent';
import VoucherOutputItemFormFields from './VoucherOutputItemFormFields';
import VoucherOutputFormFields from './VoucherOutputFormFields';
import AppStrings from '../../config/appStrings';

const VoucherOutputForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherOutputSchema, voucherOutputUpdatedSchema } = useValidators();
    const { t } = useTranslation();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherOutputSchema : voucherOutputUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>

                    <VoucherOutputFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    {
                        isAdd && <>
                            <p className="text-danger mt-3">{t(AppStrings.add_first_item_voucher)}</p>
                            <VoucherOutputItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                        </>
                    }
                </>
            }
        </FormComponent>
    )
}

export default VoucherOutputForm
