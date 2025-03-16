import React from 'react'
import { voucherOutputItemsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { useGetProductUnitsByIdQuery, useGetAllProductsQuery } from '../../features/productSlice';

const VoucherOutputItemFormFields = ({ errors, register, watch, setValue }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery(
        watch('Warehouse') ? {
            Warehouse: watch('Warehouse'),
            pageNumber: 1,
            pageSize: 100
        } : null,
        {
            skip: !watch('Warehouse')
        }
    );
    const { data: unitsData, isLoading: isLoadingUnits } = useGetProductUnitsByIdQuery(
        watch('ItemId')
    );
    const units = !isLoadingUnits
        ? unitsData?.map((item) => ({ value: item.UnitId, label: item.UnitAr }))
        : [];

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];
    return (
        <FormFieldsComponent options={{
            ItemId: productsData ? products : [],
            Unit: unitsData ? units : []
        }} errors={errors} register={register} setValue={setValue} watch={watch} fields={voucherOutputItemsFormFields} />
    )
}

export default VoucherOutputItemFormFields
