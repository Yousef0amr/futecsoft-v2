import React from 'react'
import { useState } from 'react'
import AppStrings from '../../config/appStrings'
import { useVoucherTransferItemsManagement } from '../../hook/useVoucherTransferManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useVoucherItemsColDefs } from '../../config/agGridColConfig'
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import useUnitManagement from '../../hook/useUnitManagement'


const ListVoucherTransferItem = ({ voucher, onFirstSubmit, isAdd = false }) => {
    const { data: voucherPorducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherTransferItemsManagement({ id: voucher.DocNo });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const { data: allUnits } = useUnitManagement();
    const [isAddItem, setIsAddItem] = useState(isAdd);

    const [selectedItem, setSelectedItem] = useState(null);

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        voucher.FromWarehouse ? {
            Warehouse: voucher.FromWarehouse,
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !voucher.FromWarehouse
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
                ItemID: item.ItemID,
                Qty: item.Qty,
                Unit: item.UnitID,
                Cost: item.Cost,
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...voucher,
                Voucher_Transfer_Insert_Details: products
            }
            const result = await onFirstSubmit(invoiceData)
            if (result?.Success) {
                setIsAddItem(false)
            }
            return;
        }

        Promise.all(data.map(async (item) => {
            return await handleEntityOperation({
                operation: "update",
                data: { ...voucher, RowId: voucherPorducts.length > 0 ? +voucherPorducts[voucherPorducts.length - 1].RowID + 1 : 1, Cost: item.Cost, Qty: item.Qty, ItemID: item.ItemID, Unit: item.UnitID },
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong
            });
        }))
    };
    const handleOnDeleteClick = async (data, handleCancel) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemID: data.ItemID, DocNo: data.DocNo, Unit: data.UnitID, RowID: data.RowID },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel,
        })
    };


    const columns = useVoucherItemsColDefs({
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
            initialData={voucherPorducts} />
    )
}

export default ListVoucherTransferItem
