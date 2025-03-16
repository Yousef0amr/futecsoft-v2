import React from 'react';
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';
import { Row } from 'react-bootstrap';

import ProductFormFields2 from './ProductFormFields2';
import ProductImageField from './ProductImageField';

const ProductForm = ({ onSubmit, isLoading, resetForm, enableReset, defaultValuesEdit = {} }) => {
    const { productSchema } = useValidators();



    return (
        <FormComponent enableReset={enableReset} isLoading={isLoading} resetForm={resetForm} defaultValues={defaultValuesEdit} schema={productSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <Row style={{ marginTop: '15px' }} lg={1}>
                    <ProductImageField register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ProductFormFields2 register={register} errors={errors} watch={watch} setValue={setValue} />
                </Row>
            )}
        </FormComponent>
    );
};

export default ProductForm;
