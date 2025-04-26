import React from 'react';
import useVoucherRecievingManagement from '../../hook/useVoucherRecievingManagement';
import { useTranslation } from 'react-i18next';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentVoucherRecievingKeyQuery } from '../../features/voucherRecievingSlice';
import AppStrings from '../../config/appStrings';
import VoucherReceivingForm from '../../components/voucher_receiving/VoucherReceivingForm';

const AddReceivingVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherRecievingManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherRecievingKeyQuery();

    const onFirstSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faArrowDown} title={t(AppStrings.add_new_voucher_receiving)} optionComponent={
            <NavButton icon={'list'} title={AppStrings.list_vouchers_receiving} path={routes.recieving_voucher.list} />
        }>
            <VoucherReceivingForm
                customSubmit={true}
                isLoading={isAdding}
                isAdd={true}
                onFirstSubmit={onFirstSubmit}
                defaultValuesEdit={{
                    DocID: currentKey,
                }}
            />
        </FormCard>
    )
}

export default AddReceivingVoucher;
