import React, { useState } from 'react'
import useEntityOperations from '../../hooks/useEntityOperations';
import AppStrings from '../../config/appStrings';
import { useVoucherItemsColDefs } from '../../config/agGridColConfig';
import { useVoucherOutputItemsManagement } from '../../hook/useVoucherOutputManagement';
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import useUnitManagement from '../../hook/useUnitManagement'
import SearchModal from '../common/SearchModal'
const ListVoucherOutputItems = ({ voucher, tableRef, isAdd = false }) => {
    const { data: voucherProducts, isLoading, addEntity, updateEntity, deleteEntity, isDeleting, refetch } = useVoucherOutputItemsManagement({ queryParams: { },id: voucher.DocNo, skip: isAdd ,  });
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
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



    const handleOnDeleteClick = async (data,handleCancel) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemId: data.ItemID, DocNo: voucher.DocNo, Warehouse: voucher.Warehouse, Unit: data.UnitID, RowId: data.RowId },
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
    const columns = useVoucherItemsColDefs({
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
                add_title={AppStrings.add_new_product}
                isLoading={isLoading}
                isDeleting={isDeleting}
                onDelete={handleOnDeleteClick}
                ref={tableRef}
                enableDetele={!isAdd}
                columns={columns}
                initialData={voucherProducts} />
            <SearchModal open={modalOpen.open} handleSelectChange={handleSelectChange} options={modalOpen.type === 'product' ? products : filteredUnits ? filteredUnits : units} handleSaveOption={handleSaveOption} selectedOption={modalOpen.type === 'product' ? selectedProduct : selectedUnit} handleClose={() => setModalOpen({ open: false, params: null, type: null })} />

        </>

    )
}

export default ListVoucherOutputItems
