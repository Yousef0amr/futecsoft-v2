import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Stack, Button } from 'react-bootstrap'
import FormCard from '../../components/common/FormCard'
import AgGridTable from '../../components/common/AgGridTable'
import ReportForm from './ReportForm'
import FilterSearch from '../../components/common/FilterSearch'
import AppStrings from '../../config/appStrings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import DialogModel from '../common/DialogModel'
import TablePrintData from '../common/TablePrintData'




const ListReport = ({ searchData, options, onChange, onSubmit, summary, schema, fields, icon, title, data, isLoading, useComponentsColDefs }) => {
    const { t } = useTranslation();
    const [quickFilterText, setQuickFilterText] = useState();
    const [open, setOpen] = useState(false);
    return (
        <FormCard icon={icon} title={t(title)} optionComponent={<FilterSearch onFilterTextBoxChanged={setQuickFilterText} />}>
            <Row lg={1} md={1} sm={1} className='gap-3 w-100' >
                <Col >
                    <ReportForm onChange={onChange} options={options} fields={fields} isLoading={isLoading} schema={schema} onSubmit={onSubmit} />
                </Col>
                <Col >
                    <AgGridTable
                        enableActions={false}
                        dynamicColumns={useComponentsColDefs}
                        rowData={data}
                        isLoading={isLoading}
                        quickFilterText={quickFilterText}
                    />
                </Col>
                <Col >
                    <Row >
                        {
                            summary && Object.entries(summary)?.map(([key, value]) => (
                                <Col key={key} xs={12} sm={6} md={4} lg={2} >
                                    <Stack className='text-center mt-2' style={{ borderRadius: '5px', color: 'white', backgroundColor: 'var( --border-color-1)', border: '1px solid var(--border-color-1)', padding: '2px', }} >
                                        <span >
                                            {t(AppStrings[key])}
                                        </span>
                                        <span >
                                            {value}
                                        </span>
                                    </Stack>
                                </Col>
                            ))
                        }
                        {

                            data && data?.length > 0 && <Col xs={12} sm={6} md={4} lg={2}  >
                                <Stack onClick={() => setOpen(true)} className='text-center mt-2' style={{ cursor: 'pointer', borderRadius: '5px', color: 'white', backgroundColor: 'var(--secondary-color)', padding: '2px', }} >
                                    <span >
                                        {t(AppStrings.print)}
                                    </span>
                                    <span >
                                        <FontAwesomeIcon icon={faPrint} />
                                    </span>
                                </Stack>
                            </Col>}
                    </Row>
                </Col>
            </Row>
            <DialogModel open={open} fullScreen={true}  >
                <TablePrintData searchData={searchData} searchFields={fields} rowData={data} columns={useComponentsColDefs} summary={summary} />
                <Stack gap={4} direction='horizontal' className='p-2'  >
                    <Button className='w-50 justify-content-center d-flex align-items-center gap-2' variant='success' onClick={() => window.print()}>
                        <FontAwesomeIcon icon={faPrint} />
                        {
                            t(AppStrings.print)
                        }
                    </Button>
                    <Button className='w-50' variant='danger' onClick={() => setOpen(false)}>{t(AppStrings.cancel)}</Button>
                </Stack>
            </DialogModel>
        </FormCard>
    )
}

export default ListReport
