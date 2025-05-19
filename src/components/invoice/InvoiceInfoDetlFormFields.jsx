import React from 'react'
import { Row, Col, Stack } from 'react-bootstrap'
import { invoiceInfoDetlFormFields } from './../../config/formFields'
import { useTranslation } from 'react-i18next'


const InvoiceInfoDetlFormFields = ({ register, errors, setValue, watch, isAdd = false }) => {
    const { t } = useTranslation()
    return (
        <Row >
            {
                invoiceInfoDetlFormFields.map((field) => {
                    return <Col key={field.name} xs={12} sm={6} md={4} lg={2} >
                        <Stack className='text-center mt-2' style={{ borderRadius: '5px', color: 'white', backgroundColor: 'var( --border-color-1)', border: '1px solid var(--border-color-1)', padding: '2px', }} >
                            <span >
                                {t(field.label)}
                            </span>
                            <input {...register(field.name)} type={field.type} className='border-0 outline-0 bg-transparent text-white text-center p-2' disabled={field.disabled} />
                        </Stack>
                    </Col>
                })
            }
        </Row>
    )
}
//if you want you can change it as you like  // it is ok

export default InvoiceInfoDetlFormFields
