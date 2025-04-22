import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import { useTranslation } from 'react-i18next'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { useInvoicesItemsColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'

import Loader from '../common/Loader'
const ListInvoiceItems = ({ onFirstSubmit, invoice = [] }) => {
    const { data: allUnits } = useUnitManagement();
    const { t } = useTranslation();

    const [selectedItem, setSelectedItem] = useState(null);

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
    const { data, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch }
        = useInvoiceItemsManagement({
            id: invoice?.DocID
        });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID.toString(), label: item.Unit_AR }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {

        const invoiceData = { ...invoice, DocID: invoice.DocID, LineId: data.id, UnitPrice: data.UnitPrice, Qty: data.Qty, ItemId: data.ItemID, Unit: data.UnitID, ItemDiscountPercentage: data.DiscountPercentage, ItemDiscount: data.Discount }

        return await handleEntityOperation({
            operation: "update",
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.product_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        });
    };

    const handleOnDeleteClick = async (data, handleCancel) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: invoice.DocID, Warehouse: invoice.Warehouse, Unit: data.UnitID },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };


    const columns = useInvoicesItemsColDefs({
        products: products ? products : [], units: units ? units : [], getSelectedVaule: (value) => {
            setSelectedItem(value);
        }
    })

    if (isLoadingProducts) {
        return <Loader />;
    }

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

export default ListInvoiceItems


