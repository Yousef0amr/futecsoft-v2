import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { productCheckFormFields, productFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'


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
                    <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={productFormFields} />
                </Col>
                <Col xs={12} md={1} >
                </Col>
            </Row>

        </Col>
    )
}

export default ProductFormFields2
