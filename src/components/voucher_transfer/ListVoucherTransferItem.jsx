import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import { useVoucherTransferItemsManagement } from '../../hook/useVoucherTransferManagement'
import useEntityOperations from '../../hooks/useEntityOperations'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import FormCard from '../common/FormCard'
import { useVoucherItemsColDefs } from '../../config/agGridColConfig'
import TableWithCRUD from '../common/TableWithCRUD'
import { useGetAllProductsQuery, useGetProductUnitsByIdQuery } from '../../features/productSlice'
import useUnitManagement from '../../hook/useUnitManagement'
import Loader from '../common/Loader';
import { Button } from 'react-bootstrap';

const ListVoucherTransferItem = ({ voucher }) => {
    const { data, isLoading, addEntity, updateEntity, deleteEntityFromCache, deleteEntity, isDeleting, refetch } = useVoucherTransferItemsManagement({ id: voucher.DocNo });
    const { t } = useTranslation();
    const { handleEntityOperation } = useEntityOperations({ addEntity, updateEntity, deleteEntity });
    const { data: allUnits } = useUnitManagement();


    const [selectedItem, setSelectedItem] = useState(null);

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        voucher.FromWarehouse ? {
            Warehouse: voucher.FromWarehouse,
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !voucher.FromWarehouse
        }
    );

    const { data: unitsData, isLoading: isLoadingUnits } = useGetProductUnitsByIdQuery(
        selectedItem ? selectedItem : null,
        {
            skip: !selectedItem
        }
    );
    const [infoOpen, setInfoOpen] = React.useState(false);



    const units = !isLoadingUnits
        ? allUnits?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const onSubmit = async (data) => {
        const operationType = data.isNew ? "add" : "update";
        setInfoOpen(false);
        return await handleEntityOperation({
            operation: operationType,
            data: { ...voucher, Cost: data.Cost, Qty: data.Qty, ItemId: data.ItemID, Unit: data.UnitID },
            cacheUpdater: refetch,
            successMessage: operationType === "update"
                ? AppStrings.product_updated_successfully
                : AppStrings.product_added_successfully,
            errorMessage: operationType === "add"
                ? AppStrings.something_went_wrong
                : AppStrings.material_already_added,
        });
    };

    const handleOnDeleteClick = async (data) => {
        return await handleEntityOperation({
            operation: "delete",
            data: { ItemID: data.ItemID, DocNo: data.DocNo, Unit: data.UnitID },
            cacheUpdater: deleteEntityFromCache(data.ItemID),
            successMessage: AppStrings.product_deleted_successfully,
            errorMessage: AppStrings.something_went_wrong,
        })
    };


    const columns = useVoucherItemsColDefs({
        products, units, getSelectedVaule: (value) => {
            setSelectedItem(value);
            setInfoOpen(true);
        }
    })

    if (isLoadingProducts) {
        return <Loader />;
    }
    return (
        <FormCard icon={faTruck} title={t(AppStrings.list_products)} >
            {!isLoadingProducts && <TableWithCRUD
                info={
                    infoOpen && <div className='fs-6 d-flex align-items-center  gap-2'>
                        <p className='mb-0'>
                            {
                                t(AppStrings.units_can_used)
                            }
                        </p>
                        <div className='d-flex gap-2'>
                            {
                                unitsData?.map((item) =>
                                    <Button disabled classsName='fw-bold fs-6' variant='danger' size='sm' key={item.UnitId
                                    }>{item.UnitAr}</Button>
                                )
                            }
                        </div>
                    </div>
                }
                setInfoOpen={setInfoOpen}
                isLoading={isLoading}
                isDeleting={isDeleting}
                handleOnDeleteClick={handleOnDeleteClick}
                onSubmit={onSubmit}
                columns={columns}
                initialRows={data} />}
        </FormCard>
    )
}

export default ListVoucherTransferItem
