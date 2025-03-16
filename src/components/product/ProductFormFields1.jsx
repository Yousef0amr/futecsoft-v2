import React from 'react';
import { Col } from 'react-bootstrap';
import { productFormFields, productSelectFormFields } from '../../config/formFields';
import { useLazyGetCurrentProductkeyQuery } from '../../features/productSlice';
import FormFieldsComponent from '../common/FormFieldsComponent';
import useCategoryManagement from './../../hook/useCategoryManagement'
import useBranchManagement from './../../hook/useBranchManagement'
import useUnitManagement from './../../hook/useUnitManagement'
import useTaxManagement from '../../hook/useTaxManagement';

const ProductFormFields1 = ({ register, errors, watch, setValue }) => {

    const { data: categoriesData, isLoading: isLoadingCategories } = useCategoryManagement();
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const { data: taxesData, isLoading: isLoadingTaxes } = useTaxManagement();
    const { data: unitsData, isLoading: isLoadingUnits } = useUnitManagement();




    const categories = !isLoadingCategories
        ? categoriesData?.map((item) => ({ value: item.Id, label: item.NameAr }))
        : [];

    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    const taxes = !isLoadingTaxes
        ? taxesData?.map((item) => ({ value: item.TaxId, label: item.TaxAr }))
        : [];

    const units = !isLoadingUnits
        ? unitsData?.map((item) => ({ value: item.UnitID, label: item.Unit_AR }))
        : [];

    const [triggerGetCurrentProductkey, { data: productKey, isLoading: isLoadingKey }] = useLazyGetCurrentProductkeyQuery();

    React.useEffect(() => {
        if (!isLoadingKey && productKey) {
            setValue('Id', productKey);
            setValue('Barcode', productKey);
        }
    }, [isLoadingKey, productKey, setValue]);

    const onSelectChange = (value, name) => {
        if (name === 'Father') {
            triggerGetCurrentProductkey(value);
        }
    };

    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} triggerEvent={onSelectChange} fields={productSelectFormFields} options={
            {
                Warehouse: branches,
                Father: categories,
                TaxPercentage: taxes,
                UnitID: units
            }}
        />
    );
};

export default ProductFormFields1;
