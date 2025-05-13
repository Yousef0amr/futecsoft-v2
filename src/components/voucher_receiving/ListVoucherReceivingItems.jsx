import React from 'react'
import { useVoucherRecievingItemsManagement } from '../../hook/useVoucherRecievingManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import AppStrings from '../../config/appStrings'
import TableWithCRUD from '../common/TableWithCRUD'
import { useVoucherReceivingItemsColDefs } from './../../config/agGridColConfig'
import useUnitManagement from '../../hook/useUnitManagement'
import SearchModal from '../common/SearchModal'
import { useState } from 'react'



const ListVoucherReceivingItems = ({ voucher, onFirstSubmit, isAdd }) => {
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherRecievingItemsManagement({ id: voucher.DocID });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const [isAddItem, setIsAddItem] = React.useState(isAdd);
    const { data: allUnits, isLoading: isLoadingUnits } = useUnitManagement();
    const [modalOpen, setModalOpen] = useState({
        open: false,
        params: null,
        type: null
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        {
            pageNumber: 1,
            pageSize: 100
        }
    );

    const { data: unitsData, isLoading: isLoadingFilterUnits } = useGetProductUnitsByIdQuery(
        selectedProduct ? selectedProduct.value : null,
        {
            skip: !selectedProduct
        }
    );
    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];

    const filteredUnits = !isLoadingFilterUnits
        ? unitsData?.map((item) => ({ value: item.UnitId.toString(), label: item.UnitAr }))
        : [];
    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {

        const products = data.reduce((acc, item, index) => {
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
                LineID: index + 1
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
            return result;
        }

        Promise.all(data.map(async (item) => {
            return await handleEntityOperation({
                operation: "update",
                data: {
                    ...voucher, LineId: voucherProducts.length > 0 ? +voucherProducts[voucherProducts.length - 1].LineId + 1 : 1,
                    WareHouse: voucher.Warehouse, ItemID: item.ItemID,
                    SentQty: item.SentQty, RecievedQty: item.RecievedQty,
                    Difference: item.Difference, Unit: item.Unit, UnitPrice: item.UnitPrice, Description: item.Description
                },
                cacheUpdater: refetch,
                successMessage: AppStrings.product_updated_successfully,
                errorMessage: AppStrings.something_went_wrong
            });
        }))

    };

    const handleOnDeleteClick = async (data) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocID: voucher.DocID, WareHouse: voucher.Warehouse, Unit: data.Unit, LineID: data.LineId },
            cacheUpdater: refetch,
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
        })
    };

    const handleOpenModal = ({
        params,
        type
    }) => {
        setModalOpen({
            open: true,
            params,
            type
        });
    };

    const handleSelectChange = (e) => {
        if (modalOpen.type === 'product') {
            setSelectedProduct(e);
        }
        if (modalOpen.type === 'unit') {
            setSelectedUnit(e);
        }
    };

    const handleSaveOption = () => {
        const selectedRowParams = modalOpen.params;
        if (selectedRowParams) {

            if (modalOpen.type === 'product') {
                setSelectedProduct(selectedProduct);

                selectedRowParams.setValue(selectedProduct.value);
                selectedRowParams.node.data.ItemDescAr = selectedProduct.label;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['ItemID'],
                    force: true,
                });
            }
            if (modalOpen.type === 'unit') {

                selectedRowParams.setValue(selectedUnit.value);
                selectedRowParams.node.data.UnitDescAr = selectedUnit.label;
                selectedRowParams.node.data.Unit = selectedUnit.value;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['Unit'],
                    force: true,
                });
            }

        }

        setModalOpen({
            open: false,
            params: null,
            type: null
        });
    };

    const columns = useVoucherReceivingItemsColDefs({
        selectProduct: (value) => {
            handleOpenModal({
                params: value,
                type: 'product'
            })
        }, selectUnit: (value) => {
            handleOpenModal({
                params: value,
                type: 'unit'
            })
        },

    })

    return (
        <>
            <TableWithCRUD
                isLoading={isLoading}
                isDeleting={isDeleting}
                onDelete={handleOnDeleteClick}
                onSave={onSubmit}
                columns={columns}
                initialData={voucherProducts} />
            <SearchModal open={modalOpen.open} handleSelectChange={handleSelectChange} options={modalOpen.type === 'product' ? products : filteredUnits ? filteredUnits : units} handleSaveOption={handleSaveOption} selectedOption={modalOpen.type === 'product' ? selectedProduct : selectedUnit} handleClose={() => setModalOpen({ open: false, params: null, type: null })} />

        </>

    )
}

export default ListVoucherReceivingItems
