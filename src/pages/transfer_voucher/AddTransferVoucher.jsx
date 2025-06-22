import React, { useRef } from 'react'
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
  const tableRef = useRef()

      const onSubmit = async (voucher) => {
        const data = tableRef.current?.getDirtyData();
          const products = data.reduce((acc, item,) => {
              acc.push({
                  ItemID: item.ItemID,
                  Qty: item.Qty,
                  Unit: item.UnitID,
                  Cost: item.Cost,
              });
              return acc;
          }, []);

              const invoiceData = {
                  ...voucher,
                  Voucher_Transfer_Insert_Details: products
              }
              const result =  await handleEntityOperation({
            operation: 'add',
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
              return result;
        
      };
    return (
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_transfer)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_transfer} path={routes.transfer_voucher.list} />
            </>
        }  >
            <VoucherTransferForm tableRef={tableRef} isAdd={true} isLoading={isAdding}  onSubmit={onSubmit} defaultValuesEdit={{ DocNo: currentKey, DocDate: new Date().toISOString().split("T")[0], ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddTransferVoucher
