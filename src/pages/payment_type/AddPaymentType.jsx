import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import FormCard from '../../components/common/FormCard';
import PaymentTypeForm from './../../components/payment_type/PaymentTypeForm';
import usePaymentTypeManagement from '../../hook/usePaymentTypeManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useGetCurrentPaymentTypeKeyQuery } from '../../features/paymentTypeSlice';
import { routes } from '../../config/constants';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import TabsSelect from '../../components/common/TabsSelect';
import { paymentTypeFormFields } from '../../config/formFields';


const AddPaymentType = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = usePaymentTypeManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentPaymentTypeKeyQuery();
    const [activeTab, setActiveTab] = useState(paymentTypeFormFields[0].name);

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.paymentType_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }


    const paymentType = activeTab === 'CashMoney' ? {
        CashMoney: true,
        IsCredit: false,
    } : {
        CashMoney: false,
        IsCredit: true,
    };

    const handleTabClick = (type) => {
        setActiveTab(type);
    };
    return (
        <FormCard icon={faCreditCard} title={t(AppStrings.add_new_paymentType)} optionComponent={
            <>
                <TabsSelect handleTabClick={handleTabClick} activeTab={activeTab} options={paymentTypeFormFields} />
                <NavButton icon={'list'} title={AppStrings.list_paymentTypes} path={routes.paymentMethod.list} />
            </>
        }  >
            <PaymentTypeForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ Ptype: currentKey, IsActive: true, Commissions: 0, ...paymentType }} />
        </FormCard>
    )
}

export default AddPaymentType
