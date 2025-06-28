import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
import AppStrings from '../../config/appStrings';
import useVoucherOutputManagement, { useVoucherOutputItemsManagement } from '../../hook/useVoucherOutputManagement';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import EditComponent from '../../components/common/EditComponent';
import VoucherOutputForm from '../../components/voucher_output/VoucherOutputForm';
import { routes } from '../../config/constants';
import { useTranslation } from 'react-i18next';
import useEntityOperations from '../../hooks/useEntityOperations';

const EditOutputVoucher = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    const { updateEntity, isUpdating } = useVoucherOutputManagement();
    const { refetch: refetchItems } = useVoucherOutputItemsManagement({ id: loaction.state?.DocNo, queryParams: { refetchOnMountOrArgChange: true, } });
    const { handleEntityOperation } = useEntityOperations({ updateEntity });

    const tableRef = useRef()


    const onSubmit = async (voucher) => {
        const data = tableRef.current?.getData();
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
            voucher_Output_Update_dtls: products
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
                fetchHook={useVoucherOutputManagement}
                isRefetch={true}
                onSubmit={onSubmit}
                isExternalUpdate={isUpdating}
                tableRef={tableRef}
                icon={faTruck}
                title={t(AppStrings.edit_voucher_output) + '  | ' + loaction.state.DocNo}
                path={routes.output_voucher.list}
                Form={VoucherOutputForm}
                editData={loaction.state}
            />
        </Stack>
    )
}

export default EditOutputVoucher
