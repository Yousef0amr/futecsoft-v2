import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { usePurchaseOrderItemsManagement } from '../../hook/usePurchaseOrderManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { usePurcahseOrderColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
const ListPurchaseOrderItems = ({ isAdd = false, onFirstSubmit, invoice }) => {
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
        = usePurchaseOrderItemsManagement({
            id: invoice?.DocID
        });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];


    const filteredUnits = !isLoadingFilterUnits
        ? unitsData?.map((item) => ({ value: item.UnitId, label: item.UnitAr }))
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
                Unit: item.Unit,
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
            return result;
        }

        Promise.all(
            data.map(async (item) => {
                return await handleEntityOperation({
                    operation: "add",
                    data: { ...invoice, LineId: voucherProducts.length > 0 ? +voucherProducts[voucherProducts.length - 1].LineId + 1 : 1, ItemID: item.ItemID, Unit: item.Unit, ReqQty: item.ReqQty, AvailableQty: item.AvailableQty, UnitCost: item.UnitCost },
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
            data: { ItemId: data.ItemID, DocID: invoice.DocID, Warehouse: invoice.Warehouse, Unit: data.Unit, LineID: data.LineId },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
        })
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowParams, setSelectedRowParams] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleOpenModal = (params) => {
        setSelectedRowParams(params);
        setSelectedUnit(params.data.Unit);
        setModalOpen(true);
    };

    const handleSelectChange = (e) => {
        setSelectedUnit(Number(e.target.value));
    };

    const handleSaveUnit = () => {
        if (selectedRowParams && selectedUnit != null) {

            selectedRowParams.setValue(selectedUnit.toString());



            console.log(selectedRowParams);
            // Refresh the cell so formatter reflects changes
            selectedRowParams.api.refreshCells({
                rowNodes: [selectedRowParams.node],
                columns: ['Unit'],
                force: true,
            });

            // Optional: update voucherProducts state too, if needed for persistence
            // setVoucherProducts(prev =>
            //   prev.map((item, index) =>
            //     index === selectedRowParams.rowIndex
            //       ? { ...item, Unit: selectedUnit }
            //       : item
            //   )
            // );
        }

        setModalOpen(false);
    };

    const columns = usePurcahseOrderColDefs({
        products: products ? products : [], units: units ? units : [], getSelectedVaule: (value) => {
            setSelectedItem(value);
        }, selectUnit: (value) => {
            handleOpenModal(value)
        },
        refresh: modalOpen,

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
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>Select Unit</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="unit-select-label">Unit</InputLabel>
                        <Select
                            labelId="unit-select-label"
                            value={selectedUnit ?? ''}
                            onChange={handleSelectChange}
                            label="Unit"
                        >
                            {(filteredUnits || units).map((unit) => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveUnit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ListPurchaseOrderItems