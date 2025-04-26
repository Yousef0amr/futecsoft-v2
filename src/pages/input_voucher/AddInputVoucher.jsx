import React from 'react'
import useVoucherInputManagement from '../../hook/useVoucherInputManagement';
import { useTranslation } from 'react-i18next';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import NavButton from '../../components/common/NavButton';
import { defaultInvoiceItem, defaultVoucherTypes, routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentVoucherInputKeyQuery } from '../../features/voucherInputSlice';
import AppStrings from '../../config/appStrings';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';

const AddInputVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherInputManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherInputKeyQuery();

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
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_input)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_input} path={routes.input_voucher.list} />
            </>
        }  >
            <VoucherInputForm customSubmit={true} isAdd={true} isLoading={isAdding} onFirstSubmit={onFirstSubmit} defaultValuesEdit={{ DocID: currentKey, DocDate: new Date().toISOString().split("T")[0], Vtype: defaultVoucherTypes.inputVoucher, ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddInputVoucher
