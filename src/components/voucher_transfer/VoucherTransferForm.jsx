import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import VoucherTransferFormFields from './VoucherTransferFormFields';
import VoucherTransferItemFormFields from './VoucherTransferItemFormFields';
import AppStrings from '../../config/appStrings';
import { useTranslation } from 'react-i18next';

const VoucherTransferForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherTransferSchema, voucherTransferUpdatedSchema } = useValidators();
    const { t } = useTranslation();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? voucherTransferSchema : voucherTransferUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>

                    <VoucherTransferFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    {
                        isAdd && <>
                            <p className="text-danger mt-3">{t(AppStrings.add_first_item_voucher)}</p>
                            <VoucherTransferItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                        </>
                    }
                </>
            }
        </FormComponent>
    )
}

export default VoucherTransferForm
