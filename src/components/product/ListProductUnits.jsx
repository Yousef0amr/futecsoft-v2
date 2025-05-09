import React from 'react'
import { useDeleteComponentMutation, useGetProductUnitsQuery, useUpdateProductUnitsMutation } from '../../features/productSlice'
import TableWithCRUD from '../../components/common/TableWithCRUD'
import { useItemsUnitsColDefs } from '../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import AppStrings from '../../config/appStrings'



const ListProductUnits = ({ isAdd = false, onFirstSubmit, product = [] }) => {
    const { data, isLoading, refetch } = useGetProductUnitsQuery(
        product?.Id ? product?.Id : 0,
        {
            skip: !product?.Id,
        }
    )
    const [isAddItem, setIAdd] = React.useState(isAdd);
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



        const unitsProducts = data.reduce((acc, item,) => {
            acc.push({
                ItemID: item.ItemID,
                UnitID: item.UnitId,
                IsSmall: item.IsSmall,
                Factor: item.Factor,
                Barcode: item.DiscountPercentage,
                Price1: item.Price1,
                Price2: item.Price2,
                Price3: item.Price3,
                Price4: item.Price4
            });
            return acc;
        }, []);


        if (isAddItem && data.length > 0) {
            const firstUnitData = {
                ...product,
                Price: data[0].Price1,
                Price2: data[0].Price2,
                Price3: data[0].Price3,
                Price4: data[0].Price4,
                Barcode: data[0].Barcode,
                UnitID: data[0].UnitId,
                IsSmall: data[0].IsSmall,
                Factor: data[0].Factor,
                Warehouse: product.Warehouse.join(',') || product.Tag,
                Icon: product.Icon || 'لا يوجد صورة',
                Items_Insert_Details: unitsProducts
            };

            const result = await onFirstSubmit(firstUnitData);

            if (result?.Success) {
                setIAdd(false);
            }
            return result;
        }

        for (const item of data) {
            const unitData = {
                ...product,
                Price: item.Price1,
                Price2: item.Price2,
                Price3: item.Price3,
                Price4: item.Price4,
                Barcode: item.Barcode,
                UnitID: item.UnitId,
                IsSmall: item.IsSmall,
                Factor: item.Factor,
                Warehouse: product.Warehouse.join(',') || product.Tag,
                Icon: product.Icon || 'لا يوجد صورة',
            };

            return await handleEntityOperation({
                operation: 'update',
                data: unitData,
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong,
            });
        }
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