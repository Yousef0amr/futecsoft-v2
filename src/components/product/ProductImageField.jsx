import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BrowserImage from '../common/BrowserImage'
import { productImageField } from '../../config/formFields'
import { useEffect } from 'react'
import ProductFormFields1 from './ProductFormFields1';

const ProductImageField = ({ errors, setValue, watch, register }) => {

    const id = watch('Id')
    useEffect(() => {
        if (id) {
            setValue('Barcode', id)
        }
    }, [id, setValue]);
    return (
        <Col xs={12}  >
            <Row >
                <Col xs={12} md={1} >
                </Col>
                <Col xs={12} md={4} >
                    <BrowserImage errors={errors} setValue={setValue} field={productImageField} watch={watch} />
                </Col>

                <Col xs={12} md={6} >
                    <ProductFormFields1 register={register} errors={errors} watch={watch} setValue={setValue} />

                </Col>
                <Col xs={12} md={1} >
                </Col>
            </Row>
        </Col>
    )
}

export default ProductImageField
