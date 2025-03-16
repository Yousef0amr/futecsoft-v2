import React, { useState } from 'react'
import EditComponent from '../../components/common/EditComponent'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import { useLocation } from 'react-router-dom'
import { routes } from '../../config/constants'
import { useTranslation } from 'react-i18next'
import usePaymentTypeManagement from '../../hook/usePaymentTypeManagement'
import PaymentTypeForm from '../../components/payment_type/PaymentTypeForm'
import TabsSelect from '../../components/common/TabsSelect'
import { paymentTypeFormFields } from './../../config/formFields'

const EditPaymentType = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(loaction.state.CashMoney ? "CashMoney" : "IsCredit");

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
        <EditComponent
            optionComponent={<TabsSelect handleTabClick={handleTabClick} activeTab={activeTab} options={paymentTypeFormFields} />}
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.paymentType_updated_successfully}
            fetchHook={usePaymentTypeManagement}
            isRefetch={true}
            icon={faCreditCard}
            title={t(AppStrings.edit_paymentType) + '  | ' + loaction.state.Ptype}
            path={routes.paymentMethod.list}
            Form={PaymentTypeForm}
            editData={{ ...loaction.state, ...paymentType }}
        />
    )
}

export default EditPaymentType
