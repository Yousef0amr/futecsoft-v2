import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { productCheckFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import ProductFormFields1 from './ProductFormFields1';

const ProductFormFields2 = ({ register, errors, watch, setValue }) => {

    const priceChange = watch('Price')
    useEffect(() => {
        ['Price2', 'Price3', 'Price4'].forEach((field) => {
            setValue(field, priceChange);
        });
    }, [priceChange, setValue]);
    return (
        <Col >
            <Row >
                <Col xs={12} md={1} >
                </Col>
                <Col xs={12} md={4}>
                    <FormFieldsComponent fields={productCheckFormFields} setValue={setValue} errors={errors} register={register} watch={watch} />
                </Col>
                <Col xs={12} md={6}>
                    <ProductFormFields1 register={register} errors={errors} watch={watch} setValue={setValue} />
                </Col>
                <Col xs={12} md={1} >
                </Col>
            </Row>

        </Col>
    )
}

export default ProductFormFields2
