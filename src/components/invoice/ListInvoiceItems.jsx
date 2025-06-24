import React, { useState } from 'react'
import AppStrings from '../../config/appStrings'
import useEntityOperations from '../../hooks/useEntityOperations'
import { useInvoiceItemsManagement } from '../../hook/useInvoiceManagement'
import useUnitManagement from '../../hook/useUnitManagement'
import { useInvoicesItemsColDefs } from '../../config/agGridColConfig';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import SearchModal from '../common/SearchModal'
import { calculateItemDetails, calculateInvoiceTotals,restructureData,checkRequiredData } from '../../utils/calcInvoiceDetl'

const ListInvoiceItems = ({ tableRef, invoice = [], isAdd = false, setValue }) => {
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
    )

    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntity, isDeleting, refetch }
        = useInvoiceItemsManagement(
            { id: invoice.DocID, skip: isAdd ,queryParams: {} }
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

       const handleSaveOption = (item) => {
        const selectedRowParams = modalOpen.params;

        if (selectedRowParams) {

            if (modalOpen.type === 'product') {
                selectedRowParams.setValue(item?.value);
                selectedRowParams.node.data.ItemDescAr = item?.label;
                selectedRowParams.node.data.TaxPercentage = item?.taxPer;
                selectedRowParams.node.data.Discountable = item?.discountable;
                selectedRowParams.node.data.Taxable = item?.taxable;
                selectedRowParams.api.refreshCells({
                    rowNodes: [selectedRowParams.node],
                    columns: ['ItemID'],
                    force: true,
                });
            }
            if (modalOpen.type === 'unit') {

                selectedRowParams.setValue(item?.value);
                selectedRowParams.node.data.UnitDescAr = item?.label;
                selectedRowParams.node.data.UnitID = item?.value;
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

    const handleSelectChange = (e) => {
        if (modalOpen.type === 'product') {
            handleSaveOption(e);
            setSelectedProduct(e);
        }
        if (modalOpen.type === 'unit') {
            handleSaveOption(e);
        }
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

    const handleClickEnter = (grid,handleAddRow) => {
        const data = grid.current.props.rowData

        if (!data) return

        const products = restructureData({ data, invoice })

        console.log(products)
        const val = calculateItemDetails(products, invoice)
        const totals = calculateInvoiceTotals(val)

        data.forEach((p, index) => {
            let rowNode = grid.current.api.getRowNode(p.id);
            rowNode.data.GrandTotal = val[index]?.GrandTotal
            grid.current.api.refreshCells({
                rowNodes: [rowNode],
                columns: ['GrandTotal'],
                force: true,
            });
        })

       if(checkRequiredData({products}) ){ 
            handleAddRow()
        }

        setValue("Tax", totals.tax)
        setValue("Discount", totals.discount)
        setValue("GrandTotal", totals.netTotal)
        setValue("SubTotal", totals.subTotal)
    }

     const resetTotals = () => {
            setValue("GrandTotal", 0)
            setValue("SubTotal", 0)
            setValue("Tax", 0)
            setValue("Discount", 0)
        }
    
    return (
        <div> <TableWithCRUD
            add_title={AppStrings.add_new_product}
            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={handleOnDeleteClick}
            handleClickEnter={handleClickEnter}
            resetTotals={resetTotals}
            ref={tableRef}
            enableDelete={!isAdd}
            enableAddNewRow={false}
            columns={columns}
            initialData={voucherProducts} />
            <SearchModal open={modalOpen.open} handleSelectChange={handleSelectChange} options={modalOpen.type === 'product' ? products : filteredUnits ? filteredUnits : units} handleSaveOption={handleSaveOption} selectedOption={modalOpen.type === 'product' ? selectedProduct : selectedUnit} handleClose={() => setModalOpen({ open: false, params: null, type: null })} />
        </div>

    )
}

export default ListInvoiceItems


