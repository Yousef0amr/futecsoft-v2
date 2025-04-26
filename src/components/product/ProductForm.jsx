import React from 'react';
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';
import { Row } from 'react-bootstrap';

import ProductFormFields2 from './ProductFormFields2';
import ProductImageField from './ProductImageField';
import ListProductUnits from './ListProductUnits';


const ProductForm = ({ isAdd, onSubmit, isLoading, customSubmit = false, onFirstSubmit, defaultValuesEdit = {} }) => {
    const { productSchema } = useValidators();



    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={productSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <>
                    <Row style={{ marginTop: '15px' }} lg={1}>
                        <ProductImageField register={register} errors={errors} setValue={setValue} watch={watch} />
                        <ProductFormFields2 register={register} errors={errors} watch={watch} setValue={setValue} />
                    </Row>
                    <ListProductUnits isAdd={isAdd} onFirstSubmit={onFirstSubmit} product={{
                        ...defaultValuesEdit,
                        Warehouse: watch('Warehouse'),
                        Discountable: watch('Discountable'),
                        IsService: watch('IsService'),
                        IsActive: watch('IsActive'),
                        Saleable: watch('Saleable'),
                        Taxable: watch('Taxable'),
                        Icon: watch('Icon'),
                        Id: watch('Id'),
                        NameAr: watch('NameAr'),
                        NameEn: watch('NameEn'),
                        Father: watch('Father'),
                        TaxPercentage: watch('TaxPercentage'),
                    }} />
                </>
            )}
        </FormComponent>
    );
};

export default ProductForm;
