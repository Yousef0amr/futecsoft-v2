import React, { useState } from 'react'
import useEntityOperations from '../../hooks/useEntityOperations';
import AppStrings from '../../config/appStrings';
import { useVoucherItemsColDefs } from '../../config/agGridColConfig';
import { useVoucherOutputItemsManagement } from '../../hook/useVoucherOutputManagement';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import useUnitManagement from '../../hook/useUnitManagement'

const ListVoucherOutputItems = ({ voucher, onFirstSubmit, isAdd = false }) => {
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherOutputItemsManagement({ id: voucher.DocNo });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const { data: allUnits } = useUnitManagement();
    const [isAddItem, setIsAddItem] = useState(isAdd);
    const [selectedItem, setSelectedItem] = useState(null);

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
                Cost: item.Cost,
                OutputType: voucher.OutputType
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...voucher,
                voucher_Ouput_Insert_Detail: products
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
                data: { ...voucher, RowId: voucherProducts.length > 0 ? +voucherProducts[voucherProducts.length - 1]?.RowId + 1 : 1, Cost: item.Cost, Qty: item.Qty, ItemID: item.ItemID, Unit: item.UnitID },
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong
            });
        }))
    };

    const handleOnDeleteClick = async (data) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocNo: voucher.DocNo, Warehouse: voucher.Warehouse, Unit: data.UnitID, RowId: data.RowId },
            cacheUpdater: refetch,
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
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
            initialData={voucherProducts} />
    )
}

export default ListVoucherOutputItems
