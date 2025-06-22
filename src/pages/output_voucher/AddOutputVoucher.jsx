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
import { useRef } from 'react';

const AddOutputVoucher = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useVoucherOutputManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentVoucherOutputKeyQuery();
  const tableRef = useRef()


      const onSubmit = async (voucher) => {
      const data = tableRef.current?.getDirtyData();
          const products = data.reduce((acc, item,) => {
              acc.push({
                  ItemId: item.ItemID,
                  Qty: item.Qty,
                  Unit: item.UnitID,
                  Cost: item.Cost,
                  OutputType: voucher.OutputType
              });
              return acc;
          }, []);
  

              const invoiceData = {
                  ...voucher,
                  voucher_Ouput_Insert_Detail: products
              }
              const result =   await handleEntityOperation({
            operation: 'add',
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.voucher_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
              return result;
          
      };

    return (
        <FormCard icon={faTruck} title={t(AppStrings.add_new_voucher_output)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_vouchers_output} path={routes.output_voucher.list} />
            </>
        }  >
            <VoucherOutputForm tableRef={tableRef} isAdd={true} isLoading={isAdding} onSubmit={onSubmit} defaultValuesEdit={{ DocNo: currentKey, DocDate: new Date().toISOString().split("T")[0], DocType: defaultVoucherTypes.outputVoucher, ...defaultInvoiceItem }} />
        </FormCard>
    )
}

export default AddOutputVoucher
