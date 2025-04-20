import React from 'react';
import ListComponent from '../../components/common/ListComponent';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useVoucherProvideManagement from '../../hook/useVoucherProvideManagement';
import { useVoucherProvideColDefs } from '../../config/agGridColConfig';

const ListProvideVoucher = () => {
    return (
        <ListComponent
            entityName="voucher_provide"
            entityKey="ReqNo"
            fetchHook={useVoucherProvideManagement}
            columnDefsHook={useVoucherProvideColDefs}
            routes={routes.provide_voucher}
            icon={faArrowRightArrowLeft}
            deleteSuccessMessage={AppStrings.voucher_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_vouchers_provide}
            addButtonTitle={AppStrings.add_new_voucher_provide}
            optionId="Warehouse"
        />
    );
};

export default ListProvideVoucher;
