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

const AddProduct = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, addEntityToCache } = useProductManagement()
    const { handleEntityOperation } = useEntityOperations({ addEntity });

    const onSubmit = async (data) => {
        handleEntityOperation({
            operation: 'add',
            data: { product: data },
            cacheUpdater: addEntityToCache,
            cacheData: data,
            successMessage: AppStrings.product_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        })
    }


    return (
        <FormCard icon={faBarcode} title={t(AppStrings.add_new_product)}
            navButton={
                <div className='d-flex gap-3'>
                    <NavButton icon={"list"} title={AppStrings.list_products} path={routes.product.list} />
                </div>
            }>
            <ProductForm isLoading={isAdding} resetForm={!isAdding} onSubmit={onSubmit} defaultValuesEdit={defaultProductValues} />
        </FormCard>
    )
}

export default AddProduct
