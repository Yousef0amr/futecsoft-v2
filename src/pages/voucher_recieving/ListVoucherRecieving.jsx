import React from 'react';
import ListComponent from '../../components/common/ListComponent';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import useVoucherRecievingManagement from '../../hook/useVoucherRecievingManagement';
import { useVoucherRecievingColDefs } from '../../config/agGridColConfig';

const ListReceivingVoucher = () => {
    return (
        <ListComponent
            entityName="voucher_receiving"
            entityKey="DocID"
            fetchHook={useVoucherRecievingManagement}
            columnDefsHook={useVoucherRecievingColDefs}
            routes={routes.recieving_voucher}
            icon={faArrowDownWideShort}
            deleteSuccessMessage={AppStrings.voucher_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_vouchers_receiving}
            addButtonTitle={AppStrings.add_new_voucher_receiving}
            optionId="Warehouse"
        />
    );
};

export default ListReceivingVoucher;
