import React from 'react'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import FormCard from '../../components/common/FormCard'
import CurrencyForm from '../../components/currency/CurrencyForm'
import useCurrencyManagment from '../../hook/useCurrencyManagment'
import { routes } from '../../config/constants'
import NavButton from '../../components/common/NavButton'

const AddCurrency = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, addEntityToCache, isAddedSuccess } = useCurrencyManagment();
    const { handleEntityOperation } = useEntityOperations({ addEntity });

    const onSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: addEntityToCache,
            cacheData: data,
            successMessage: AppStrings.currency_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faMoneyBill} title={t(AppStrings.add_new_currency)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_currencies} path={routes.currency.list} />
            </>
        }  >
            <CurrencyForm isLoading={isAdding} enableReset={true} isSuccess={isAddedSuccess} onSubmit={onSubmit} defaultValuesEdit={{ IsDefault: true }} />
        </FormCard>
    )
}

export default AddCurrency