import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { useInvoicesItemsColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import SearchModal from '../common/SearchModal'
import { calculateItemDetails, calculateInvoiceTotals } from '../../utils/calcInvoiceDetl'


const restructureData = ({ data, invoice }) => {
    return data.reduce((acc, item,) => {
        acc.push({
            DocID: invoice.DocID,
            PriceIncludeTax: invoice.PriceIncludeTax,
            ItemId: item.ItemID,
            Qty: item.Qty,
            Unit: item.UnitID,
            UnitPrice: item.UnitPrice,
            Discountable: item.Discountable,
            Taxable: item.Taxable,
            TaxPercentage: item.TaxPercentage,
            Tax: (item.TaxPercentage / 100) * ((item.Qty * item.UnitPrice) - item.Discount),
            ItemDiscountPercentage: item.DiscountPercentage ?? 0,
            ItemDiscount: item.Discount ?? 0
        });
        return acc;
    }, []);
}

const ListInvoiceItems = ({ customSubmit, onFirstSubmit, invoice = [], isAdd = false, setValue }) => {
    const { data: allUnits, isLoading: isLoadingUnits } = useUnitManagement();


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
    )

    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntity, isDeleting, refetch }
        = useInvoiceItemsManagement(
            { id: invoice.DocID, skip: isAdd }
        );

    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });

    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID.toString(), label: item.Unit_AR }))
        : [];

    const filteredUnits = !isLoadingFilterUnits
        ? unitsData?.map((item) => ({ value: item.UnitId.toString(), label: item.UnitAr }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr, taxPer: item.TaxPercentage, discountable: item.Discountable, taxable: item.Taxable }))
        : [];

    const resetTotals = () => {
        setValue("GrandTotal", 0)
        setValue("SubTotal", 0)
        setValue("Tax", 0)
        setValue("Discount", 0)
    }

    const onSubmit = async (data) => {

        const products = restructureData({ data, invoice })

        const val = calculateItemDetails(products, invoice)
        const totals = calculateInvoiceTotals(val)



        setValue("Tax", totals.tax)
        setValue("Discount", totals.discount)
        setValue("GrandTotal", totals.netTotal)
        setValue("SubTotal", totals.subTotal)

        const invoiceData = {
            DocID: invoice.DocID, ...totals,
            Vtype: invoice.Vtype,
            InvoiceNo: invoice.InvoiceNo,
            DocDate: invoice.DocDate,
            Supplier: invoice.Supplier,
            PriceIncludeTax: invoice.PriceIncludeTax,
            Note: invoice.Note,
            Warehouse: invoice.Warehouse,
            PayType: invoice.PayType,
            purchase_Invoice_Insert_Details: val
        }

        if (isAddItem) {
            const result = await onFirstSubmit(invoiceData)
            if (result?.Success) {
                setIAdd(false)
                resetTotals()
            }
            return result;
        }

        return await handleEntityOperation({
            operation: "add",
            data: invoiceData,
            cacheUpdater: refetch,
            successMessage: AppStrings.product_added_successfully,
            errorMessage: AppStrings.something_went_wrong
        });

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
                selectedRowParams.node.data.TaxPercentage = selectedProduct.taxPer;
                selectedRowParams.node.data.Discountable = selectedProduct.discountable;
                selectedRowParams.node.data.Taxable = selectedProduct.taxable;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['ItemID'],
                    force: true,
                });
            }
            if (modalOpen.type === 'unit') {

                selectedRowParams.setValue(selectedUnit.value);
                selectedRowParams.node.data.UnitDescAr = selectedUnit.label;
                selectedRowParams.node.data.UnitID = selectedUnit.value;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['UnitID'],
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

    const columns = useInvoicesItemsColDefs({
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

    const handleClickEnter = (grid) => {

        const data = grid.current.props.rowData

        if (!data) return

        const products = restructureData({ data, invoice })
        const val = calculateItemDetails(products, invoice)
        const totals = calculateInvoiceTotals(val)

        data.forEach((p, index) => {
            let rowNode = grid.current.api.getRowNode(p.id);
            rowNode.data.GrandTotal = val[index].GrandTotal
            grid.current.api.refreshCells({
                rowNodes: [rowNode],
                columns: ['GrandTotal'],
                force: true,
            });
        })

        setValue("Tax", totals.tax)
        setValue("Discount", totals.discount)
        setValue("GrandTotal", totals.netTotal)
        setValue("SubTotal", totals.subTotal)
    }






    return (
        <div> <TableWithCRUD

            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={handleOnDeleteClick}
            onSave={onSubmit}
            handleClickEnter={handleClickEnter}
            resetTotals={resetTotals}
            columns={columns}
            initialData={voucherProducts} />
            <SearchModal open={modalOpen.open} handleSelectChange={handleSelectChange} options={modalOpen.type === 'product' ? products : filteredUnits ? filteredUnits : units} handleSaveOption={handleSaveOption} selectedOption={modalOpen.type === 'product' ? selectedProduct : selectedUnit} handleClose={() => setModalOpen({ open: false, params: null, type: null })} />
        </div>

    )
}

export default ListInvoiceItems


