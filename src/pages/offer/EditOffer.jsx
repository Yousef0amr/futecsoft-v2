import React, { useState } from 'react'
import useOfferManagement from '../../hook/useOfferManagement';
import AppStrings from '../../config/appStrings';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import EditComponent from '../../components/common/EditComponent';
import { routes } from '../../config/constants';
import { offerTypeFormFields } from '../../config/formFields';
import OfferForm from '../../components/offer/OfferForm';
import { useTranslation } from 'react-i18next';
import TabsSelect from '../../components/common/TabsSelect';

const EditOffer = () => {
    const loaction = useLocation()
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(loaction.state.OfferTypeEn.replace(/\s+/g, ''));


    const offerType = activeTab === 'PriceOffer' ? {
        PriceOffer: true,
        QtyOffer: false,
        ExtraOffer: false
    } : activeTab === 'QtyOffer' ? {
        PriceOffer: false,
        QtyOffer: true,
        ExtraOffer: false
    } : {
        PriceOffer: false,
        QtyOffer: false,
        ExtraOffer: true
    };
    const handleTabClick = (type) => {
        setActiveTab(type);
    };

    return (
        <EditComponent
            optionComponent={<TabsSelect handleTabClick={handleTabClick} activeTab={activeTab} options={offerTypeFormFields} />}
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.offer_updated_successfully}
            fetchHook={useOfferManagement}
            icon={faStar}
            isRefetch={true}
            title={t(AppStrings.edit_offer) + '  | ' + loaction.state.OfferId}
            path={routes.offer.list}
            Form={OfferForm}
            editData={{  ...loaction.state, Branch: loaction.state.Branch.split(','), Product: loaction.state.ProductId,ExtraProduct : "" , ...offerType }}
        />
    )
}

export default EditOffer