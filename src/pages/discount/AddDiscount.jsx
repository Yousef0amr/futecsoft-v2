import React from 'react'
import AppStrings from '../../config/appStrings';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../config/constants';
import FormCard from '../../components/common/FormCard';
import DiscountForm from '../../components/discount/DiscountForm';
import useDiscountManagement from '../../hook/useDiscountManagement';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useTranslation } from 'react-i18next';
import NavButton from '../../components/common/NavButton';
import { useGetCurrentDiscountKeyQuery } from '../../features/discountSlice';



const AddDiscount = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useDiscountManagement();
    const { data: currentKey } = useGetCurrentDiscountKeyQuery();
    const { handleEntityOperation } = useEntityOperations({ addEntity });

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data,
            cacheUpdater: refetch,
            successMessage: AppStrings.discount_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }
    return (
        <FormCard icon={faPercent} title={t(AppStrings.add_new_discount)} optionComponent={
            <>
                <NavButton icon={'list'} title={AppStrings.list_discounts} path={routes.discountType.list} />
            </>
        }  >
            <DiscountForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={{ Serial: currentKey, IsActive: true }} />
        </FormCard>
    )
}

export default AddDiscount
