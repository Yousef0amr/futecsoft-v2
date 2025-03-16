import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import useVoucherOutputManagement from '../../hook/useVoucherOutputManagement'
import { useVoucherOutputColDefs } from '../../config/agGridColConfig'
import { routes } from '../../config/constants'
import { faTruckFront } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'

const ListOutputVoucher = () => {
    return (
        <ListComponent
            entityName="voucher_output"
            entityKey="DocNo"
            fetchHook={useVoucherOutputManagement}
            columnDefsHook={useVoucherOutputColDefs}
            routes={routes.output_voucher}
            icon={faTruckFront}
            deleteSuccessMessage={AppStrings.voucher_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_vouchers_output}
            addButtonTitle={AppStrings.add_new_voucher_output}
            optionId={"Warehouse"}
        />
    )
}

export default ListOutputVoucher
