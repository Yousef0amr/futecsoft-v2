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
    const { addEntity, isAdding, refetch, isAddedSuccess } = useOfferManagement();
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const { data: currentKey } = useGetCurrentOfferKeyQuery();
    const [activeTab, setActiveTab] = useState({
        PriceOffer: true,
        QtyOffer: false,
        ExtraOffer: false,
    });
    const onSubmit = async (data) => {
        return await handleEntityOperation({
            operation: 'add',
            data: {
                ...data,
                OfferId: currentKey,

            },
            successMessage: AppStrings.offer_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }


    const handleTabClick = (type) => {
        setActiveTab({
            PriceOffer: type === 'PriceOffer',
            QtyOffer: type === 'QtyOffer',
            ExtraOffer: type === 'ExtraOffer',
        });
    };
    return (
        <FormCard icon={faStar} title={t(AppStrings.add_new_offer)} navButton={<NavButton icon={'list'} title={AppStrings.list_offers} path={routes.offer.list} />} optionComponent={
            <TabsSelect handleTabClick={handleTabClick} activeTab={
                activeTab.PriceOffer ? 'PriceOffer' : activeTab.QtyOffer ? 'QtyOffer' : 'ExtraOffer'
            } options={offerTypeFormFields} />
        }  >
            <OfferForm activeTab={activeTab} isLoading={isAdding} isSuccess={isAddedSuccess} onSubmit={onSubmit} defaultValuesEdit={{ Price: 0, Qty: 0, IsActive: true, ...activeTab }} />
        </FormCard>
    )
}

export default AddOffer
