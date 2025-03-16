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
            <Row xs={1} lg={2} >
                <Col>
                    <ProductFormFields1 register={register} errors={errors} watch={watch} setValue={setValue} />
                </Col>
                <Col>
                    <FormFieldsComponent fields={productCheckFormFields} setValue={setValue} errors={errors} register={register} watch={watch} />
                </Col>
            </Row>

        </Col>
    )
}

export default ProductFormFields2
