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
    const { addEntity, isAdding, refetch, isAddedSuccess } = usePaymentTypeManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentPaymentTypeKeyQuery();
    const [activeTab, setActiveTab] = useState({
        CashMoney: true,
        IsCredit: false
    });

    const onSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data: {
                ...data,
                Ptype: currentKey,
                ...activeTab
            },
            successMessage: AppStrings.paymentType_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }



    const handleTabClick = (type) => {
        setActiveTab({
            CashMoney: type === 'CashMoney',
            IsCredit: type === 'IsCredit',
        });
    };
    return (
        <FormCard icon={faCreditCard} title={t(AppStrings.add_new_paymentType)} optionComponent={
            <>
                <TabsSelect handleTabClick={handleTabClick} activeTab={activeTab.CashMoney ? "CashMoney" : "IsCredit"} options={paymentTypeFormFields} />
                <NavButton icon={'list'} title={AppStrings.list_paymentTypes} path={routes.paymentMethod.list} />
            </>
        }  >
            <PaymentTypeForm isLoading={isAdding} enableReset={true} isSuccess={isAddedSuccess} onSubmit={onSubmit} defaultValuesEdit={{ Ptype: currentKey, IsActive: true, Commissions: 0 }} />
        </FormCard>
    )
}

export default AddPaymentType
