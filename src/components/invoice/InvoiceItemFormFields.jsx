import React from 'react'
import { invoiceItemsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { useGetProductUnitsByIdQuery, useGetAllProductsQuery } from '../../features/productSlice'

const InvoiceItemFormFields = ({ register, errors, setValue, watch }) => {

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
        <FormFieldsComponent fields={invoiceItemsFormFields} options={{
            ItemId: productsData ? products : [],
            Unit: unitsData ? units : []
        }} setValue={setValue} errors={errors} register={register} watch={watch} />
    )
}

export default InvoiceItemFormFields
