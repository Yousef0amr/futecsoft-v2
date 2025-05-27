import React from 'react'
import ListComponent from '../../components/common/ListComponent'
import AppStrings from '../../config/appStrings'
import { routes } from '../../config/constants'
import { faTruckArrowRight } from '@fortawesome/free-solid-svg-icons'
import useVoucherInputManagement from '../../hook/useVoucherInputManagement'
import { useVoucherInputColDefs } from '../../config/agGridColConfig'
import { Visibility } from '@mui/icons-material'

const ListInputVoucher = () => {
    return (
        <ListComponent
            editIcon={<Visibility style={{ color: "#c3c3c3" }} />}
            entityName="voucher_input"
            entityKey="DocID"
            fetchHook={useVoucherInputManagement}
            columnDefsHook={useVoucherInputColDefs}
            routes={routes.input_voucher}
            icon={faTruckArrowRight}
            deleteSuccessMessage={AppStrings.voucher_deleted_successfully}
            deleteErrorMessage={AppStrings.something_went_wrong}
            formTitle={AppStrings.list_vouchers_input}
            addButtonTitle={AppStrings.add_new_voucher_input}
            optionId={"Warehouse"}
        />
    )
}

export default ListInputVoucher
