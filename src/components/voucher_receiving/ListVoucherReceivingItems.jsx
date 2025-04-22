import React from 'react'
import { useVoucherRecievingItemsManagement } from '../../hook/useVoucherRecievingManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useGetAllProductsQuery } from '../../features/productSlice'
import AppStrings from '../../config/appStrings'
import TableWithCRUD from '../common/TableWithCRUD'
import { useVoucherReceivingItemsColDefs } from './../../config/agGridColConfig'



const ListVoucherReceivingItems = ({ voucher }) => {
    const { data, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherRecievingItemsManagement({ id: voucher.DocID });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        voucher.Warehouse ? {
            Warehouse: voucher.Warehouse,
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !voucher.Warehouse
        }
    );

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {
        const operationType = data.isNew ? "add" : "update";
        return await handleEntityOperation({
            operation: operationType,
            data: { ...voucher, UnitPrice: data.UnitPrice, Qty: data.Qty, ItemId: data.ItemID, Unit: data.UnitID },
            cacheUpdater: refetch,
            successMessage: operationType === "update"
                ? AppStrings.product_updated_successfully
                : AppStrings.product_added_successfully,
            errorMessage: operationType === "add"
                ? AppStrings.something_went_wrong
                : AppStrings.material_already_added,
        });
    };

    const handleOnDeleteClick = async (data) => {
        handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: voucher.DocID, WareHouse: voucher.Warehouse, Unit: data.UnitID },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
        })
    };


    const columns = useVoucherReceivingItemsColDefs({
        products
    })

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

export default ListVoucherReceivingItems
