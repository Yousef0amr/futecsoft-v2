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
    const { addEntity, isAdding, refetch,isAddedSuccess } = useVoucherTransferManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherTransferKeyQuery();
  const tableRef = useRef()

      const onSubmit = async (voucher) => {
        const data = tableRef.current?.getDirtyData();
          const products = data.filter(item => item?.ItemID != null && item?.UnitID != null && item?.Cost != null).reduce((acc, item,) => {
              acc.push({
                  ItemID: item.ItemID,
                  Qty: item.Qty?? 1,
                  Unit: item.UnitID,
                  Cost: item.Cost,
              });
              return acc;
          }, []);

              const invoiceData = {
                  ...voucher,
                  DocNo: currentKey,
                  Voucher_Transfer_Insert_Details: products
              }
              const result =  await handleEntityOperation({
            operation: 'add',
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })

               if(result?.Success){
                tableRef.current?.resetTable()
              }
              return result;
        
      };
    return (
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_transfer)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_transfer} path={routes.transfer_voucher.list} />
            </>
        }  >
            <div className='w-100'>
            <VoucherTransferForm isSuccess={isAddedSuccess} enableReset={true} tableRef={tableRef} isAdd={true} isLoading={isAdding}  onSubmit={onSubmit} defaultValuesEdit={{ DocNo: currentKey, DocDate: new Date().toISOString().split("T")[0], ...defaultInvoiceItem }} />

            </div>
        </FormCard>
    )
}

export default AddTransferVoucher
