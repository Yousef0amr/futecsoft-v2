import React from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import useDeliveryCompanyManagement from '../../hook/useDeliveryCompanyManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import FormCard from '../../components/common/FormCard';
import DeliveryCompanyForm from '../../components/deliveryCompany/DeliveryCompanyForm';
import NavButton from '../../components/common/NavButton';
import { useGetCurrentDeliveryCompanyKeyQuery } from '../../features/deliveryCompanySlice';

const AddDeliveryCompany = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useDeliveryCompanyManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentDeliveryCompanyKeyQuery();

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.deliveryCompany_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faCar} title={t(AppStrings.add_new_deliveryCompany)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_deliveryCompanies} path={routes.delivery_company.list} />
            </>
        }  >
            <DeliveryCompanyForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ CompanyID: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddDeliveryCompany
