import React from 'react'
import { useLocation } from 'react-router-dom'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import AppStrings from '../../config/appStrings'
import { useTranslation } from 'react-i18next'
import ProductForm from '../../components/product/ProductForm'
import EditComponent from '../../components/common/EditComponent'
import useProductManagement from '../../hook/useProductManagement'
import { routes } from '../../config/constants'
import { useState } from 'react'
import ListProductUnits from '../../components/product/ListProductUnits'
import { Button } from 'react-bootstrap'
import { Stack } from '@mui/material'


const EditProduct = () => {
    const location = useLocation()
    const { t } = useTranslation();
    const [addNew, setAddNew] = useState(false)

    return (
        <Stack gap={2}>
            <EditComponent
                errorMessage={AppStrings.something_went_wrong}
                successMessage={AppStrings.product_updated_successfully}
                isRefetch={true}
                fetchHook={useProductManagement}
                icon={faBarcode}
                title={t(AppStrings.edit_product) + '  | ' + location.state.Id}
                path={routes.product.list}
                Form={ProductForm}
                editData={{ ...location.state, Icon: location.state.ImgPath ? location.state.ImgPath : 'لا يوجد صورة', Father: location.state.CatID, Warehouse: location.state.Tag.split(',') }}
            />

            <Button variant="success" onClick={() => setAddNew(!addNew)}>{t(AppStrings.add_new_unit)}</Button>
            {
                addNew && <ListProductUnits product={location.state} onFirstSubmit={() => { }} />
            }
        </Stack>
    )
}

export default EditProduct
