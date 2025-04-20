import React from 'react';
import useVoucherInputManagement from '../../hook/useVoucherInputManagement';
import { useTranslation } from 'react-i18next';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { defaultInvoiceItem, defaultVoucherTypes, routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentVoucherInputKeyQuery } from '../../features/voucherInputSlice';
import AppStrings from '../../config/appStrings';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';

const AddReceivingVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherInputManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherInputKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faArrowDown} title={t(AppStrings.add_new_voucher_receiving)} optionComponent={
            <NavButton icon={'list'} title={AppStrings.list_vouchers_receiving} path={routes.receiving_voucher.list} />
        }>
            <VoucherInputForm
                isAdd={true}
                isLoading={isAdding}
                resetForm={!isAdding}
                onSubmit={onSubmit}
                defaultValuesEdit={{
                    DocID: currentKey,
                    DocDate: new Date().toISOString().split("T")[0],
                    Vtype: defaultVoucherTypes.receivingVoucher,
                    ...defaultInvoiceItem
                }}
            />
        </FormCard>
    )
}

export default AddReceivingVoucher;
