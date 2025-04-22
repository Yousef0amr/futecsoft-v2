import React from 'react'
import { useDeleteComponentMutation, useGetProductUnitsQuery, useUpdateProductUnitsMutation } from '../../features/productSlice'
import TableWithCRUD from '../../components/common/TableWithCRUD'
import { useItemsUnitsColDefs } from '../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import AppStrings from '../../config/appStrings'
import { useTranslation } from 'react-i18next'


const ListProductUnits = ({ onFirstSubmit, product = [] }) => {
    const { data, isLoading, refetch } = useGetProductUnitsQuery(
        product?.Id ? product?.Id : 0,
        {
            skip: !product?.Id,
        }
    )


    const { t } = useTranslation();
    const [updateProductUnits, { isLoading: isUpdating }] = useUpdateProductUnitsMutation()
    const [deleteComponent, { isLoading: isDeleting }] = useDeleteComponentMutation()

    const { handleEntityOperation } = useEntityOperations({
        updateEntity: updateProductUnits,
        deleteEntity: deleteComponent
    });

    const { data: units, isLoading: isLoadingUnits } = useUnitManagement();

    const unitsData = !isLoadingUnits
        ? units?.map((item) => ({ value: item?.UnitID, label: item.Unit_AR }))
        : [];

    const handleOnDeleteClick = async (data, handleCancel) => {
        handleEntityOperation({
            operation: "delete",
            data: { ItemID: product.Id, SubItem: data.UnitId },
            cacheUpdater: refetch,
            successMessage: AppStrings.unit_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel,
        });
    };


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

        <TableWithCRUD
            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={handleOnDeleteClick}
            onSave={onSubmit}
            columns={columns}
            initialData={data} />

    )
}

export default ListProductUnits