import React from 'react'
import useVoucherTransferManagement from '../../hook/useVoucherTransferManagement';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import FormCard from '../../components/common/FormCard';
import VoucherTransferForm from '../../components/voucher_transfer/VoucherTransferForm';
import { defaultInvoiceItem, routes } from '../../config/constants';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { useGetCurrentVoucherTransferKeyQuery } from '../../features/voucherTransferSlice';
import useEntityOperations from '../../hooks/useEntityOperations';

const AddTransferVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherTransferManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherTransferKeyQuery();

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
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_transfer)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_transfer} path={routes.transfer_voucher.list} />
            </>
        }  >
            <VoucherTransferForm isAdd={true} isLoading={isAdding} customSubmit={true} onFirstSubmit={onFirstSubmit} defaultValuesEdit={{ DocNo: currentKey, DocDate: new Date().toISOString().split("T")[0], ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddTransferVoucher
