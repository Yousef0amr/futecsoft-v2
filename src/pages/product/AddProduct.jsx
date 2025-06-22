import React, { useRef } from 'react'
import FormCard from '../../components/common/FormCard'
import ProductForm from '../../components/product/ProductForm'
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import NavButton from '../../components/common/NavButton';
import useProductManagement from '../../hook/useProductManagement';
import { defaultProductValues, routes } from '../../config/constants';
import useEntityOperations from '../../hooks/useEntityOperations';
import { useLocation, useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const { t } = useTranslation();
    const { addEntity, isAdding, refetch } = useProductManagement()
    
    const { handleEntityOperation } = useEntityOperations({ addEntity });
    const location = useLocation();

        const tableRef = useRef()
        const navigate = useNavigate();
        const CompositeMaterial = location.state?.CompositeMaterial
    
      const onSubmit = async (product) => {
        const data = tableRef.current?.getDirtyData();
        if(data) {
       const unitsProducts = data.reduce((acc, item,) => {
                acc.push({
                    ItemID: product.Id,
                    UnitID: item.UnitId,
                    IsSmall: item.IsSmall || false,
                    Factor: item.Factor,
                    Barcode: item.Barcode || product.Barcode,
                    Price1: item.Price1,
                    Price2: item.Price2,
                    Price3: item.Price3,
                    Price4: item.Price4
                });
                return acc;
            }, []);

                      const newProduct = {
                    ...product,
                    Barcode: product.Barcode,
                    Price: unitsProducts[0].Price1,
                    Price2: unitsProducts[0].Price2,
                    Price3: unitsProducts[0].Price3,
                    Price4: unitsProducts[0].Price4,
                    UnitID: unitsProducts[0].UnitID,
                    IsSmall: unitsProducts[0].IsSmall,
                    Factor: unitsProducts[0].Factor,
                    Warehouse: product.Warehouse.join(',') || product.Tag,
                    TaxPercentage: Number(product.TaxPercentage ?? 0) ,
                    Icon: product.Icon || 'لا يوجد صورة',
                    Items_Insert_Details: unitsProducts
                };
                const result =   await handleEntityOperation({
            operation: 'add',
            data: { product: newProduct },
            cacheUpdater: refetch,
            cacheData: data,
            successMessage: AppStrings.product_added_successfully,
            errorMessage: AppStrings.something_went_wrong
                             })
    
                if (result?.Success) {
                    navigate(CompositeMaterial ? routes.product.compositeComponents : routes.product.list, { replace: true });
                }
                return result;
        } else {
console.log("error add units")
        }
        };
    
   

    return (
        <FormCard icon={faBarcode} title={t(AppStrings.add_new_product)}
            navButton={
                <div className='d-flex gap-3'>
                    <NavButton icon={"list"}   title={AppStrings.list_products} path={
                        CompositeMaterial ? routes.product.compositeComponents : routes.product.list
                    } />
                </div>
            }>
            <ProductForm tableRef={tableRef}  isAdd={true}  isLoading={isAdding} onSubmit={onSubmit} defaultValuesEdit={{ ...defaultProductValues ,StandardItem: !CompositeMaterial, CompositeMaterial}} />
        </FormCard>
    )
}

export default AddProduct
