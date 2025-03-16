import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import useVoucherTransferManagement from '../../hook/useVoucherTransferManagement'
import { useVoucherTransferColDefs } from '../../config/agGridColConfig'
import { routes } from '../../config/constants'
import { faTruckArrowRight } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'

const ListTransferVoucher = () => {
    return (
        <ListComponent
            entityName="voucher_transfer"
            entityKey="DocNo"
            fetchHook={useVoucherTransferManagement}
            columnDefsHook={useVoucherTransferColDefs}
            routes={routes.transfer_voucher}
            icon={faTruckArrowRight}
            deleteSuccessMessage={AppStrings.voucher_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_vouchers_transfer}
            addButtonTitle={AppStrings.add_new_voucher_transfer}
        />
    )
}

export default ListTransferVoucher
