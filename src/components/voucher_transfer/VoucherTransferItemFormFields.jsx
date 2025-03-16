import React from 'react'
import { voucherTransferItemsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { useGetProductUnitsByIdQuery, useGetAllProductsQuery } from '../../features/productSlice'

const VoucherTransferItemFormFields = ({ errors, register, watch, setValue }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        watch('FromWarehouse') ? {
            Warehouse: watch('FromWarehouse'),
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !watch('FromWarehouse')
        }
    );
    const { data: unitsData, isLoading: isLoadingUnits } = useGetProductUnitsByIdQuery(
        watch('ItemID')
    );
    const units = !isLoadingUnits
        ? unitsData?.map((item) => ({ value: item.UnitId, label: item.UnitAr }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];


    return (
        <FormFieldsComponent options={{
            ItemID: productsData ? products : [],
            Unit: unitsData ? units : []
        }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherTransferItemsFormFields} />
    )
}

export default VoucherTransferItemFormFields
