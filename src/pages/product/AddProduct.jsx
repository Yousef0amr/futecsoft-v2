import React from 'react'
import FormCard from '../../components/common/FormCard'
import ProductForm from '../../components/product/ProductForm'
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import useProductManagement from '../../hook/useProductManagement';
import { defaultProductValues, routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import useNotification from '../../hooks/useNotification';

const AddProduct = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useProductManagement()
    const { handleEntityOperation } = useEntityOperations({ addEntity });

    const { success } = useNotification();
    const onFirstSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data: { product: data },
            cacheUpdater: refetch,
            cacheData: data,
            successMessage: AppStrings.product_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }

    const onSave = async () => {
        success(t(AppStrings.opertion_saved));
    }
    return (
        <FormCard icon={faBarcode} title={t(AppStrings.add_new_product)}
            navButton={
                <div className='d-flex gap-3'>
                    <NavButton icon={"list"} title={AppStrings.list_products} path={routes.product.list} />
                </div>
            }>
            <ProductForm customSubmit={true} onSubmit={onSave} isAdd={true} isLoading={isAdding} onFirstSubmit={onFirstSubmit} defaultValuesEdit={defaultProductValues} />
        </FormCard>
    )
}

export default AddProduct
