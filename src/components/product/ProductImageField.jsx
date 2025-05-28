import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BrowserImage from '../common/BrowserImage'
import { productImageField, productFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { useEffect } from 'react'


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
                    <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={productFormFields} />
                </Col>
                <Col xs={12} md={1} >
                </Col>
            </Row>
        </Col>
    )
}

export default ProductImageField
