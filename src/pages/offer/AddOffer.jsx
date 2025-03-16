import React, { useState } from 'react'
import FormCard from '../../components/common/FormCard'
import NavButton from '../../components/common/NavButton'
import OfferForm from '../../components/offer/OfferForm'
import useOfferManagement from '../../hook/useOfferManagement'
import { useGetCurrentOfferKeyQuery } from '../../features/offerSlice'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../config/constants'
import useEntityOperations from '../../hooks/useEntityOperations'
import TabsSelect from '../../components/common/TabsSelect'
import { offerTypeFormFields } from '../../config/formFields'

const AddOffer = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useOfferManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentOfferKeyQuery();
    const [activeTab, setActiveTab] = useState(offerTypeFormFields[0].name);
    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.offer_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }


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
        <FormCard icon={faStar} title={t(AppStrings.add_new_offer)} navButton={<NavButton icon={'list'} title={AppStrings.list_offers} path={routes.offer.list} />} optionComponent={
            <TabsSelect handleTabClick={handleTabClick} activeTab={activeTab} options={offerTypeFormFields} />
        }  >
            <OfferForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ OfferId: currentKey, IsActive: true, ...offerType }} />
        </FormCard>
    )
}

export default AddOffer
