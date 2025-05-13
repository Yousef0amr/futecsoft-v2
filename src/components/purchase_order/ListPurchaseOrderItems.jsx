import { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { usePurchaseOrderItemsManagement } from '../../hook/usePurchaseOrderManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { usePurcahseOrderColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import LazySelect from '../common/LazySelect'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next'
import SearchModal from '../common/SearchModal'
const ListPurchaseOrderItems = ({ isAdd = false, onFirstSubmit, invoice }) => {
    const { data: allUnits, isLoading: isLoadingUnits } = useUnitManagement();
    const { t } = useTranslation()
    const [isAddItem, setIAdd] = useState(isAdd);
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
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch }
        = usePurchaseOrderItemsManagement({
            id: invoice?.DocID
        });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID.toString(), label: item.Unit_AR }))
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
            cacheData: data,
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
            finalCallback: handleCancel
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
                console.log(selectedProduct)
                selectedRowParams.setValue(selectedProduct.value);
                selectedRowParams.node.data.ItemDescAr = selectedProduct.label;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['ItemID'],
                    force: true,
                });
            }
            if (modalOpen.type === 'unit') {
                console.log(selectedUnit)
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

    const columns = usePurcahseOrderColDefs({
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

export default ListPurchaseOrderItems