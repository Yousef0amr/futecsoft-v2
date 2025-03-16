import React from 'react'
import useVoucherOutputManagement from '../../hook/useVoucherOutputManagement';
import { useTranslation } from 'react-i18next';
import FormCard from '../../components/common/FormCard';
import VoucherOutputForm from '../../components/voucher_output/VoucherOutputForm';
import { defaultInvoiceItem, defaultVoucherTypes } from '../../config/constants';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentVoucherOutputKeyQuery } from '../../features/voucherOutputSlice';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';

const AddOutputVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherOutputManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherOutputKeyQuery();

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
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_output)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_output} path={routes.output_voucher.list} />
            </>
        }  >
            <VoucherOutputForm isAdd={true} isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ DocNo: currentKey, DocDate: new Date().toISOString().split("T")[0], DocType: defaultVoucherTypes.outputVoucher, ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddOutputVoucher
