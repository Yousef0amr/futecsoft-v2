import React from 'react';
import useVoucherProvideManagement from '../../hook/useVoucherProvideManagement';
import { useTranslation } from 'react-i18next';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentVoucherProvideKeyQuery } from '../../features/voucherProvideSlice';
import AppStrings from '../../config/appStrings';
import VoucherProvideForm from '../../components/voucher_provide/VoucherProvideForm';

const AddProvideVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherProvideManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherProvideKeyQuery();

    const onFirstSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    return (
        <FormCard icon={faArrowRight} title={t(AppStrings.add_new_voucher_provide)} optionComponent={
            <NavButton icon={'list'} title={AppStrings.list_vouchers_provide} path={routes.provide_voucher.list} />
        }>
            <VoucherProvideForm
                isAdd={true}
                isLoading={isAdding}
                customSubmit={true}
                onFirstSubmit={onFirstSubmit}
                defaultValuesEdit={{
                    ReqNo: currentKey,
                }}
            />
        </FormCard>
    )
}

export default AddProvideVoucher;
