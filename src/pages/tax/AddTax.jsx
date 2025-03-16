import React from 'react'
import { useTranslation } from 'react-i18next'
import FormCard from '../../components/common/FormCard'
import { faUsd } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../config/constants'
import useTaxManagement from '../../hook/useTaxManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useGetCurrentTaxKeyQuery } from '../../features/taxSlice'
import AppStrings from '../../config/appStrings'
import NavButton from '../../components/common/NavButton'
import TaxForm from '../../components/tax/TaxForm'


const AddTax = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, addEntityToCache } = useTaxManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentTaxKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: addEntityToCache,
            cacheData: data,
            successMessage: AppStrings.tax_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faUsd} title={t(AppStrings.add_new_tax)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_taxes} path={routes.tax.list} />
            </>
        }  >
            <TaxForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ TaxId: currentKey, IsDefault: true, TaxIsActive: true }} />
        </FormCard>
    )
}

export default AddTax
