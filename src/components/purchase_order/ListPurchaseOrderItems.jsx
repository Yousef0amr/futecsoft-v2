import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { usePurcahseOrderColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'

const ListPurchaseOrderItems = ({ isAdd = false, onFirstSubmit, invoice }) => {
    const { data: allUnits } = useUnitManagement();

    const [selectedItem, setSelectedItem] = useState(null);
    const [isAddItem, setIAdd] = useState(isAdd);

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        invoice?.Warehouse ? {
            Warehouse: invoice.Warehouse,
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !invoice?.Warehouse
        }
    );

    const { data: unitsData, isLoading: isLoadingUnits } = useGetProductUnitsByIdQuery(
        selectedItem ? selectedItem : null,
        {
            skip: !selectedItem
        }
    );
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch }
        = useInvoiceItemsManagement({
            id: invoice?.DocID
        });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {

        const products = data.reduce((acc, item, index) => {
            acc.push({
                DocID: invoice.DocID,
                Vtype: invoice.Vtype,
                LineID: index + 1,
                ItemId: item.ItemID,
                ReqQty: item.ReqQty,
                Unit: item.UnitID,
                AvailableQty: item.AvailableQty,
                UnitCost: item.UnitCost,
                Warehouse: invoice.Warehouse
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...invoice,
                purchase_Order_Insert_Details: products
            }
            const result = await onFirstSubmit(invoiceData)

            if (result?.Success) {
                setIAdd(false)
            }
            return;
        }

        Promise.all(
            data.map(async (item) => {
                return await handleEntityOperation({
                    operation: "add",
                    data: { ...invoice, LineId: voucherProducts.length > 0 ? +voucherProducts[voucherProducts.length - 1].LineId + 1 : 1, ItemID: item.ItemID, Unit: item.UnitID, ReqQty: item.ReqQty, AvailableQty: item.AvailableQty, UnitCost: item.UnitCost },
                    cacheUpdater: refetch,
                    successMessage: AppStrings.product_added_successfully,
                    errorMessage: AppStrings.something_went_wrong
                });
            })
        )
    };

    const handleOnDeleteClick = async (data, handleCancel) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: invoice.DocID, Warehouse: invoice.Warehouse, Unit: data.UnitID, LineID: data.LineId },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };


    const columns = usePurcahseOrderColDefs({
        products: products ? products : [], units: units ? units : [], getSelectedVaule: (value) => {
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

export default ListPurchaseOrderItems