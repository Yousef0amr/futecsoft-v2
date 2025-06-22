import React, { useRef } from 'react'
import AppStrings from '../../config/appStrings';
import useVoucherTransferManagement, { useVoucherTransferItemsManagement } from '../../hook/useVoucherTransferManagement';
import EditComponent from '../../components/common/EditComponent';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import VoucherTransferForm from '../../components/voucher_transfer/VoucherTransferForm';
import { Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useEntityOperations from '../../hooks/useEntityOperations';

const EditTransferVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
 const { updateEntity,  refetch } = useVoucherTransferManagement();
      const {   refetch: refetchItems } = useVoucherTransferItemsManagement({ id: loaction.state?.DocNo,queryParams: {          refetchOnMountOrArgChange: true,} });
    const { handleEntityOperation } = useEntityOperations({ updateEntity });

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
                        voucher_Transfer_Update_dtls: products
                    }
                    const result =  await handleEntityOperation({
                  operation: 'update',
                  data: invoiceData,
                  cacheUpdater: refetch,
                  successMessage: AppStrings.voucher_updated_successfully,
                  errorMessage: AppStrings.something_went_wrong
              })

                     if(result?.Success){
                    refetchItems()
                  }
                    return result;
              
            };
    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.voucher_updated_successfully}
                fetchHook={useVoucherTransferManagement}
                isRefetch={true}
                icon={faTruck}
                onSubmit={onSubmit}
                tableRef={tableRef}
                title={t(AppStrings.edit_voucher_transfer) + '  | ' + loaction.state.DocNo}
                path={routes.transfer_voucher.list}
                Form={VoucherTransferForm}
                editData={loaction.state}
            />
        </Stack>
    )
}

export default EditTransferVoucher
