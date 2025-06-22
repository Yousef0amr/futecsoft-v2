import React from 'react'
import { useDeleteProductUnitMutation, useGetProductUnitsQuery } from '../../features/productSlice'
import TableWithCRUD from '../../components/common/TableWithCRUD'
import { useItemsUnitsColDefs } from '../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import AppStrings from '../../config/appStrings'

const ListProductUnits = ({ tableRef, isAdd, product = [] }) => {
    const { data, isLoading, refetch } = useGetProductUnitsQuery(
        product?.Id ? product?.Id : 0,
        {
            skip: !product?.Id,
             refetchOnMountOrArgChange: true,
        }
    )

    const [deleteComponent, { isLoading: isDeleting }] = useDeleteProductUnitMutation()

    const { handleEntityOperation } = useEntityOperations({
        deleteEntity: deleteComponent
    });

    const { data: units, isLoading: isLoadingUnits } = useUnitManagement();

    const unitsData = !isLoadingUnits
        ? units?.map((item) => ({ value: item?.UnitID, label: item.Unit_AR }))
        : [];

    const handleOnDeleteClick =  (data, handleCancel) => {
     return  handleEntityOperation({
            operation: "delete",
            data: { Id : product.Id, UnitId : data.UnitId , Barcode : data.Barcode },
            cacheUpdater: refetch,
            successMessage: AppStrings.unit_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel,
        });
    };

    const columns = useItemsUnitsColDefs(
        {
            units: unitsData ? unitsData : [],
            loading: isLoadingUnits,
            defaultBarcode: product.Barcode
        }
    )

    return (
        <TableWithCRUD
            ref={tableRef}
            enableDetele={!isAdd}
            add_title={AppStrings.add_new_unit}
            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={handleOnDeleteClick}
            columns={columns}
            initialData={data} />
    )
}

export default ListProductUnits