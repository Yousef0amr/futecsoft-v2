import React, { useState } from 'react'
import useEntityOperations from '../../hooks/useEntityOperations';
import AppStrings from '../../config/appStrings';
import { useVoucherInputItemsColDefs } from '../../config/agGridColConfig';
import { useVoucherProvideItemsManagement } from '../../hook/useVoucherProvideManagement';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import useUnitManagement from '../../hook/useUnitManagement'


const ListVoucherProvideItems = ({ voucher, isAdd, onFirstSubmit }) => {
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherProvideItemsManagement({ id: voucher.ReqNo });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const [selectedItem, setSelectedItem] = useState(null);
    const { data: allUnits } = useUnitManagement();
    const [isAddItem, setIsAddItem] = useState(isAdd);
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

    const { data: unitsData, isLoading: isLoadingUnits } = useGetProductUnitsByIdQuery(
        selectedItem ? selectedItem : null,
        {
            skip: !selectedItem
        }
    );

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];
    const onSubmit = async (data) => {

        const products = data.reduce((acc, item,) => {
            acc.push({
                ItemId: item.ItemID,
                Qty: item.Qty,
                Unit: item.UnitID,
                UnitPrice: item.UnitPrice,
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...voucher,
                Voucher_Provide_Insert_Details: products
            }
            const result = await onFirstSubmit(invoiceData)
            if (result?.Success) {
                setIsAddItem(false)
            }
            return result;
        }

        Promise.all(data.map(async (item) => {
            return await handleEntityOperation({
                operation: "update",
                data: { ...voucher, RowId: +voucherProducts[voucherProducts.length - 1].RowId + 1, UnitPrice: item.UnitPrice, RequestQty: item.Qty, ProvideQty: item.Qty, ItemNo: item.ItemID, Unit: item.UnitID },
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong
            });
        }))

    };

    const handleOnDeleteClick = async (data, handleCancel) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: voucher.ReqNo, Warehouse: voucher.Warehouse, Unit: data.UnitID, RowID: data.RowId },
            cacheUpdater: refetch,
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };

    const columns = useVoucherInputItemsColDefs({
        products, units, getSelectedVaule: (value) => {
            setSelectedItem(value);
        }
    })


    return (
        <TableWithCRUD
            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={handleOnDeleteClick}
            onSave={onSubmit}
            columns={columns}
            initialData={voucherProducts}
        />
    )
}

export default ListVoucherProvideItems