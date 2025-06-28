import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { productCheckFormFields,productFormQtyField , productFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import DialogModel from '../common/DialogModel'
import AppStrings from '../../config/appStrings'
import InputField from '../common/InputFiled'
import { useTranslation } from 'react-i18next'
import CheckBox from '../common/CheckBox'


const ProductFormFields2 = ({ register, errors, watch, setValue }) => {

    const priceChange = watch('Price')
    useEffect(() => {
        ['Price2', 'Price3', 'Price4'].forEach((field) => {
            setValue(field, priceChange);
        });
    }, [priceChange, setValue]);

    const [open , setOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleClose = () => {
        setOpen(false);
    };

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
            
                           <CheckBox
                                                    label={productFormQtyField.label}
                                                    isChecked={watch(productFormQtyField.name)}
                                                    onChange={(value) => {
                                                        setValue(productFormQtyField.name, value);
                                                        setOpen(true);
                                                    }}
                                                    required={productFormQtyField.required}
                                                />
  
                </Col>
                <Col xs={12} md={1} >
                </Col>
            </Row>
   <DialogModel open={open} onClose={handleClose}>
                   <div className='p-3 d-flex flex-column justify-content-center align-items-center gap-2'>
                    <p className='fs-5'>{t(AppStrings.required_quantity)}</p>
                        <input  name="Qty" label="Quantity"  type="number" min={0} />
                          <div>
                  <Button variant='danger' onClick={handleClose}>{t(AppStrings.cancel)}</Button>
              </div>
                   </div>
            
          </DialogModel>
        </Col>
    )
}

export default ProductFormFields2
