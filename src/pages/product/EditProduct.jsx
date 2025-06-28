import React from 'react'
import { useLocation } from 'react-router-dom'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import { useTranslation } from 'react-i18next'
import ProductForm from '../../components/product/ProductForm'
import EditComponent from '../../components/common/EditComponent'
import useProductManagement from '../../hook/useProductManagement'
import { routes } from '../../config/constants'
import { Stack } from '@mui/material'
import { useGetProductUnitsByIdQuery, useUpdateProductMutation, useUpdateProductUnitsMutation } from '../../features/productSlice'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useRef } from 'react'


const EditProduct = () => {
    const location = useLocation()
    const { t } = useTranslation();


    const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation()

    const { handleEntityOperation } = useEntityOperations({ updateEntity: updateProduct });
    const tableRef = useRef()
    const onSubmit = async (product) => {
        const data = tableRef.current?.getData();
        if (data) {
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
                TaxPercentage: Number(product.TaxPercentage ?? 0),
                Icon: product.Icon || 'لا يوجد صورة',
                Items_Update_Details: unitsProducts
            };
            const result = await handleEntityOperation({
                operation: 'update',
                data: { product: newProduct },
                successMessage: AppStrings.product_added_successfully,
                errorMessage: AppStrings.something_went_wrong,
                enableApiMessage: true
            })
            return result
        }
    }

    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.product_updated_successfully}
                isRefetch={true}
                fetchHook={useProductManagement}
                isExternalUpdate={isUpdatingProduct}
                icon={faBarcode}
                tableRef={tableRef}
                onSubmit={onSubmit}
                title={t(AppStrings.edit_product) + '  | ' + location.state.Id}
                path={location.state?.CompositeMaterial ? routes.product.compositeComponents : routes.product.list}
                Form={ProductForm}
                editData={{ CompositeMaterial: location.state.CompositeMaterial, ...location.state, Icon: location.state.ImgPath ? location.state.ImgPath : 'لا يوجد صورة', Father: location.state.CatID, Warehouse: location.state.Tag.split(',') }}
            />
        </Stack>
    )
}

export default EditProduct
