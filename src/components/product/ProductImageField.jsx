import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BrowserImage from '../common/BrowserImage'
import { productImageField, productFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'


const ProductImageField = ({ errors, setValue, watch, register }) => {

    return (
        <Col xs={12}  >
            <Row >
                <Col xs={12} md={6} >
                    <BrowserImage errors={errors} setValue={setValue} field={productImageField} watch={watch} />
                </Col>
                <Col xs={12} md={6} >
                    <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={productFormFields} />
                </Col>
            </Row>
        </Col>
    )
}

export default ProductImageField
