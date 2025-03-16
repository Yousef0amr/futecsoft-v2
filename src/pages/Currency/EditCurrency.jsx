import React from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import useCurrencyManagment from '../../hook/useCurrencyManagment'
import { useLocation } from 'react-router-dom'
import { routes } from '../../config/constants'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import CurrencyForm from '../../components/currency/CurrencyForm'

const EditCurrency = () => {
    const loaction = useLocation()
    const { t } = useTranslation();

    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.currency_updated_successfully}
            fetchHook={useCurrencyManagment}
            icon={faMoneyBill}
            title={t(AppStrings.edit_currency) + '  | ' + loaction.state.CurrencyId}
            path={routes.currency.list}
            Form={CurrencyForm}
            editData={loaction.state}
        />
    )
}

export default EditCurrency