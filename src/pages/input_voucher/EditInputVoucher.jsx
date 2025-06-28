import React from 'react'
import AppStrings from '../../config/appStrings';
import useVoucherInputManagement, { useVoucherInputItemsManagement } from '../../hook/useVoucherInputManagement';
import EditComponent from '../../components/common/EditComponent';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherInputForm from '../../components/voucher_input/VoucherInputForm';
import { Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import useEntityOperations from '../../hooks/useEntityOperations';


const EditInputVoucher = () => {
  const loaction = useLocation()
  const { t } = useTranslation();
  const { updateEntity, isUpdating } = useVoucherInputManagement();
  const { refetch: refetchItems } = useVoucherInputItemsManagement({ id: loaction.state?.DocID, queryParams: { refetchOnMountOrArgChange: true, } });
  const { handleEntityOperation } = useEntityOperations({ updateEntity });
  const tableRef = useRef()
  const onSubmit = async (invoice) => {
    const data = tableRef.current?.getData();

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
      DocID: invoice.DocID,
      Vtype: 1,
      netTotal,
      voucher_Input_Update_dtls: products
    }
    const result = await handleEntityOperation({
      operation: 'update',
      data: invoiceData,
      successMessage: AppStrings.voucher_updated_successfully,
      errorMessage: AppStrings.something_went_wrong
    })
    if (result?.Success) {
      refetchItems()
    }
    return result;
  };
  return (
    <Stack gap={2}>
      <EditComponent
        errorMessage={AppStrings.something_went_wrong}
        successMessage={AppStrings.voucher_updated_successfully}
        fetchHook={useVoucherInputManagement}
        onSubmit={onSubmit}
        tableRef={tableRef}
        isRefetch={true}
        icon={faTruck}
        isExternalUpdate={isUpdating}
        title={t(AppStrings.edit_voucher_input) + '  | ' + loaction.state.DocID}
        path={routes.input_voucher.list}
        Form={VoucherInputForm}
        editData={loaction.state}
      />
    </Stack>
  )
}

export default EditInputVoucher
