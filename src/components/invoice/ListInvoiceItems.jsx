import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { useInvoicesItemsColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'


const ListInvoiceItems = ({ onFirstSubmit, invoice = [], isAdd = false }) => {
    const { data: allUnits, isLoading: isLoadingUnits } = useUnitManagement();

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

    const { data: unitsData, isLoading: isLoadingFilterUnits } = useGetProductUnitsByIdQuery(
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

    const filterUnits = !isLoadingFilterUnits
        ? unitsData?.map((item) => ({ value: item.UnitId, label: item.UnitAr }))
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
                ItemDiscountPercentage: item.DiscountPercentage,
                ItemDiscount: item.Discount
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...invoice, DocID: invoice.DocID,
                purchase_Invoice_Insert_Details: products
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
                    data: {
                        ...invoice, LindId: voucherProducts.length > 0 ? +voucherProducts[voucherProducts.length - 1].LindId + 1 : 1, UnitPrice: item.UnitPrice, Qty: item.Qty, ItemID: item.ItemID, Unit: item.UnitID, ItemDiscountPercentage: item.DiscountPercentage,
                        ItemDiscount: item.Discount
                    },
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
            cacheUpdater: refetch,
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };


    const columns = useInvoicesItemsColDefs({
        products: products ? products : [], filterUnits: filterUnits ? filterUnits : [], units: units ? units : [], getSelectedVaule: (value) => {
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

export default ListInvoiceItems


