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
import { useRef } from 'react';


const AddInputVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch, isAddedSuccess } = useVoucherInputManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherInputKeyQuery();

    const tableRef = useRef()

    const onSubmit = async (invoice) => {
        const data = tableRef.current?.getDirtyData();

        const products = data
            .filter(item => item?.ItemID != null && item?.UnitID != null && item?.UnitPrice != null)
            .map(item => {
                const qty = item.Qty ?? 1;
                const price = item.UnitPrice;

                return {
                    ItemId: item.ItemID,
                    Qty: qty,
                    Unit: item.UnitID,
                    UnitPrice: price,
                    ItemDiscountPercentage: item.DiscountPercentage ?? 0,
                    ItemDiscount: item.Discount ?? 0,
                    GrandTotal: qty * price,
                };
            });

        const netTotal = products.reduce((sum, item) => sum + item.GrandTotal, 0);
        const invoiceData = {
            ...invoice,
            DocID: currentKey,
            netTotal,
            voucher_Input_Insert_Detail: products
        }
        const result = await handleEntityOperation({
            operation: 'add',
            data: invoiceData,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })

        if (result?.Success) {
            tableRef.current?.resetTable()
        }
        return result;
    };

    return (
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_input)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_input} path={routes.input_voucher.list} />
            </>
        }  >
            <div className='w-100'>
                <VoucherInputForm isSuccess={isAddedSuccess} enableReset={true} tableRef={tableRef} isAdd={true} isLoading={isAdding} onSubmit={onSubmit} defaultValuesEdit={{ DocID: currentKey, DocDate: new Date().toISOString().split("T")[0], Vtype: defaultVoucherTypes.inputVoucher, ...defaultInvoiceItem }} />

            </div>
        </FormCard>
    )
}

export default AddInputVoucher
