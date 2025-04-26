import React from 'react'
import { useVoucherRecievingItemsManagement } from '../../hook/useVoucherRecievingManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useGetAllProductsQuery } from '../../features/productSlice'
import AppStrings from '../../config/appStrings'
import TableWithCRUD from '../common/TableWithCRUD'
import { useVoucherReceivingItemsColDefs } from './../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'



const ListVoucherReceivingItems = ({ voucher, onFirstSubmit, isAdd }) => {
    const { data, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherRecievingItemsManagement({ id: voucher.DocID });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const [isAddItem, setIsAddItem] = React.useState(isAdd);
    const { data: allUnits, isLoading: isLoadingUnits } = useUnitManagement();

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


    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];
    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {

        const products = data.reduce((acc, item,) => {
            acc.push({
                DocID: voucher.DocID,
                ItemID: item.ItemID,
                SentQty: item.SentQty,
                RecievedQty: item.RecievedQty,
                Difference: item.Difference,
                Unit: item.Unit,
                UnitPrice: item.UnitPrice,
                Description: item.Description,
                Warehouse: voucher.Warehouse,
                LineID: 4
            });
            return acc;
        }, []);

        if (isAddItem) {
            const invoiceData = {
                ...voucher,
                Voucher_Recieving_Insert_Details: products
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
                data: { ...voucher, LineId: 4, WareHouse: voucher.Warehouse, ItemID: item.ItemID, SentQty: item.SentQty, RecievedQty: item.RecievedQty, Difference: item.Difference, Unit: item.UnitID, UnitPrice: item.UnitPrice, Description: item.Description },
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong
            });
        }))

    };

    const handleOnDeleteClick = async (data) => {
        handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: voucher.DocID, WareHouse: voucher.Warehouse, Unit: data.UnitID, LineID: data.LineID },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
        })
    };


    const columns = useVoucherReceivingItemsColDefs({
        products, units
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
