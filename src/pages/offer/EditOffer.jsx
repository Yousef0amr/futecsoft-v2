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
    const location = useLocation()
    const { t } = useTranslation();
     const offerTypeEn = location.state.OfferTypeEn.replace(/\s+/g, '');

const [activeTab, setActiveTab] = useState({
    PriceOffer: offerTypeEn === 'PriceOffer',
    QtyOffer: offerTypeEn === 'QtyOffer',
    ExtraOffer: offerTypeEn === 'ExtraOffer',
});

    const handleTabClick = (type) => {
        setActiveTab({
    PriceOffer: type === 'PriceOffer',
    QtyOffer:   type === 'QtyOffer',
    ExtraOffer: type === 'ExtraOffer',
  });
    };

    const Branch = typeof location.state.Branch === 'string'
  ? location.state.Branch.split(',')
  : Array.isArray(location.state.Branch)
    ? location.state.Branch
    : []
    return (
        <EditComponent
            optionComponent={<TabsSelect handleTabClick={handleTabClick} activeTab={ activeTab.PriceOffer ? 'PriceOffer' : activeTab.QtyOffer ? 'QtyOffer' : 'ExtraOffer'} options={offerTypeFormFields} />}
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.offer_updated_successfully}
            fetchHook={useOfferManagement}
optionalTab={activeTab}

            icon={faStar}
            isRefetch={true}
            title={t(AppStrings.edit_offer) + '  | ' + location.state.OfferId}
            path={routes.offer.list}
            Form={OfferForm}
            editData={{ ...location.state, Branch: Branch, Product: location.state.ProductId, ExtraProduct: location.state.ExtraProduct ?? 0 }}
        />
    )
}

export default EditOffer