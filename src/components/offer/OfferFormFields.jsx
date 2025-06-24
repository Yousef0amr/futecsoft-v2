import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { extraOfferFormFields, offersFormFields, priceOfferFormFields, qtyOfferFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
import { useGetAllProductsQuery } from '../../features/productSlice'
import SearchModal from '../common/SearchModal'


const OfferFormFields = ({activeTab , register, errors, setValue, watch }) => {
    const [open, setModalOpen] = React.useState({ open: false, name: '' });
     const {  PriceOffer,QtyOffer,ExtraOffer} = activeTab
    
     setValue('PriceOffer', PriceOffer);
     setValue('QtyOffer', QtyOffer);
     setValue('ExtraOffer', ExtraOffer);
    const handleModalClick = (name) => () => {
        setModalOpen({ open: true, name });
    }

    const handleSelectChange = (selectedOption) => {
          setValue(open.name, selectedOption.value);
        setModalOpen({
            open: false,
            name: '',
        });
    }


    const handleCloseModal = () => {
        setModalOpen({
            open: false,
            name: '',
        });
    };


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

            <FormFieldsComponent selectedValue={products} handleModalClick={handleModalClick} isLoading={isLoadingProducts} errors={errors} register={register} setValue={setValue} options={{ Branch: branches }} watch={watch} fields={offersFormFields} />

            <FormFieldsComponent selectedValue={products} handleModalClick={handleModalClick} errors={errors} register={register} setValue={setValue} watch={watch} fields={
                (PriceOffer && priceOfferFormFields) ||
                (QtyOffer && qtyOfferFormFields) ||
                (ExtraOffer && extraOfferFormFields)
            } />

            <SearchModal open={open.open} handleSelectChange={handleSelectChange}  options={products}   handleClose={handleCloseModal} />

        </>
    )
}

export default OfferFormFields
