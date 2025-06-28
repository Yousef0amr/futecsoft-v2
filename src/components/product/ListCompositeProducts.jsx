import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AgGridTable from '../../components/common/AgGridTable';
import { useComponentsColDefs } from '../../config/agGridColConfig';
import CompositeComponentsForm from './CompositeComponentsForm';
import AppStrings from '../../config/appStrings';
import { useTranslation } from 'react-i18next';


const CompositeComponents = ({ handleAddClick, isEditing, data, isLoading, enableReset, onSubmit, isSuccess, actionLoading, actions, quickFilterText, defaultValuesEdit }) => {
    const componentsColDefs = useComponentsColDefs();
    const AgGridTableMemo = React.memo(AgGridTable);
    const { t } = useTranslation();
    return (
        <div className='w-100'>
            <Row lg={2} md={1} sm={1} >
                <Col style={{ marginTop: '20px' }}>
                    <AgGridTableMemo
                        actions={actions}
                        dynamicColumns={componentsColDefs}
                        rowData={data}
                        isLoading={isLoading}
                        quickFilterText={quickFilterText}
                    />
                </Col>
                <Col >
                    {
                        isEditing ?
                            <Button style={{ border: ' none', backgroundColor: 'rgba(255, 0, 0, 0.651)', fontSize: '14px', fontWeight: '600', marginTop: '20px', marginBottom: '20px' }} onClick={handleAddClick}>{t(AppStrings.cancel_editing)}</Button> : null
                    }
                    <CompositeComponentsForm isSuccess={isSuccess} enableReset={enableReset} isLoadingKey={actionLoading} onSubmit={onSubmit} defaultValuesEdit={defaultValuesEdit} />
                </Col>
            </Row>
        </div>
    )
}

export default CompositeComponents
