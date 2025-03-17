import React from 'react'
import { useGetProductUnitsQuery, useUpdateProductUnitsMutation } from '../../features/productSlice'
import TableWithCRUD from '../../components/common/TableWithCRUD'
import { useItemsUnitsColDefs } from '../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import AppStrings from '../../config/appStrings'
import { faWeight } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import FormCard from '../../components/common/FormCard'


const ListProductUnits = ({ onFirstSubmit, product = [] }) => {
    const { data, isLoading, refetch } = useGetProductUnitsQuery(
        product?.Id ? product?.Id : 0,
        {
            skip: !product?.Id,
        }
    )
    const { t } = useTranslation();
    const [updateProductUnits, { isLoading: isUpdating }] = useUpdateProductUnitsMutation()

    const { handleEntityOperation } = useEntityOperations({
        updateEntity: updateProductUnits
    });

    const { data: units, isLoading: isLoadingUnits } = useUnitManagement();

    const unitsData = !isLoadingUnits
        ? units?.map((item) => ({ value: item?.UnitID, label: item.Unit_AR }))
        : [];


    const onSubmit = async (data) => {

        const unitData = {
            ...product,
            Price: data.Price1,
            Price2: data.Price2,
            Price3: data.Price3,
            Price4: data.Price4,
            Barcode: data.Barcode,
            UnitID: data.UnitId,
            IsSmall: data.IsSmall,
            Factor: data.Factor,
            Warehouse: product.Warehouse ? product.Warehouse : product.Tag,

            Icon: product.Icon ? product.Icon : 'لا يوجد صورة',
        }

        if (data.id === 0) {
            return await onFirstSubmit(unitData)
        }

        return await handleEntityOperation({
            operation: 'update',
            data: unitData,
            cacheUpdater: refetch,
            successMessage: AppStrings.product_updated_successfully,
            errorMessage: AppStrings.something_went_wrong

        });
    };


    const columns = useItemsUnitsColDefs(
        {
            units: unitsData ? unitsData : [],
        }
    )

    return (
        <FormCard icon={faWeight} title={t(AppStrings.list_products)} >
            <TableWithCRUD

                info={
                    []
                }
                setInfoOpen={() => { }}
                isLoading={isLoading}
                isDeleting={false}
                handleOnDeleteClick={() => { }}
                onSubmit={onSubmit}
                columns={columns}
                initialRows={data ? data : [{
                    UnitId: 0,
                    Barcode: product.Barcode ? product.Barcode : 0,
                    Price1: 0,
                    Price2: 0,
                    Price3: 0,
                    Price4: 0,
                    Factor: 0,
                    IsSmall: false
                }]} />
        </FormCard>
    )
}

export default ListProductUnits