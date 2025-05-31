import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { extraOfferFormFields, offersFormFields, priceOfferFormFields, qtyOfferFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
import { useGetAllProductsQuery } from '../../features/productSlice'
import SearchModal from '../common/SearchModal'


const OfferFormFields = ({ register, errors, setValue, watch }) => {
    const [open, setModalOpen] = React.useState({ open: false, name: '' });
    const [selectedOption, setSelectedOption] = React.useState({});

    const handleModalClick = (name) => () => {
        setModalOpen({ open: true, name });
    }

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    }
    const handleSaveOption = () => {
        setValue(open.name, selectedOption.value);
        setModalOpen({
            open: false,
            name: '',
        });
        setSelectedOption({});
    };

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
                (watch('PriceOffer') && priceOfferFormFields) ||
                (watch('QtyOffer') && qtyOfferFormFields) ||
                (watch('ExtraOffer') && extraOfferFormFields)
            } />

            <SearchModal open={open.open} handleSelectChange={handleSelectChange} options={products} handleSaveOption={handleSaveOption} selectedOption={selectedOption} handleClose={handleCloseModal} />

        </>
    )
}

export default OfferFormFields
