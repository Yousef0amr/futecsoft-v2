import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { extraOfferFormFields, offersFormFields, priceOfferFormFields, qtyOfferFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
import { useGetAllProductsQuery } from '../../features/productSlice'


const OfferFormFields = ({ register, errors, setValue, watch }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery({ pageNumber: 1, pageSize: 10 });

    const products = !isLoadingProducts
        ? productsData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    return (
        <>
            <FormFieldsComponent isLoading={isLoadingProducts} errors={errors} register={register} setValue={setValue} options={{ Branch: branches, Product: products }} watch={watch} fields={offersFormFields} />
            <FormFieldsComponent errors={errors} register={register} setValue={setValue} options={{ ExtraProduct: products }} watch={watch} fields={
                (watch('PriceOffer') && priceOfferFormFields) ||
                (watch('QtyOffer') && qtyOfferFormFields) ||
                (watch('ExtraOffer') && extraOfferFormFields)
            } />
        </>
    )
}

export default OfferFormFields
