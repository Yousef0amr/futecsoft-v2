import React from 'react'
import { Row, Col, Stack } from 'react-bootstrap'
import { invoiceInfoSum1FormFields, invoiceInfoSum2FormFields } from './../../config/formFields'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@mui/material'



const InvoiceInfoDetlFormFields = ({ handleDiscount, enableDiscount, register, errors, setValue, watch, isAdd }) => {
    const { t } = useTranslation()


    return (
        <Row >
            {
                invoiceInfoSum1FormFields.map((field) => {
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

            {
                invoiceInfoSum2FormFields.map((field) => {
                    return <Col key={field.name} xs={12} sm={6} md={4} lg={2} >
                        <Stack className='text-center mt-2' style={{ borderRadius: '5px', color: 'white', backgroundColor: 'var( --border-color-1)', border: '1px solid var(--border-color-1)', padding: '2px', }} >
                            <span >
                                {t(field.label)}
                            </span>
                            <div className='d-flex justify-content-center align-items-center gap-1' style={{
                                width: "100%",
                            }}>
                                <input {...register(field.name)} type={field.type} className='border-0 outline-0  bg-transparent text-white text-center p-2 w-100' />
                                {field.showCheck && <div className='d-flex justify-content-center align-items-center'>
                                    %
                                    <Checkbox
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                            color: "white",
                                            '&.Mui-checked': {
                                                color: "white",
                                            },
                                        }}
                                        checked={enableDiscount}
                                        onChange={handleDiscount}
                                    />
                                </div>}
                            </div>

                        </Stack>
                    </Col>
                })
            }
        </Row>
    )
}


export default InvoiceInfoDetlFormFields
