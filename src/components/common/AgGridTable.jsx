import React, { useRef, useEffect, useMemo, memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from 'react-i18next';
import AppStrings from './../../config/appStrings';
import { AG_GRID_LOCALE_EG, AG_GRID_LOCALE_EN } from '@ag-grid-community/locale';
import ActionsCellRenderer from './ActionsCellRenderer';


const AgGridTable = ({ enableActions = true, actions, actionsCellRenderer = ActionsCellRenderer, rowData, isLoading, dynamicColumns = [], quickFilterText }) => {
    const { t, i18n } = useTranslation();
    const gridApiRef = useRef(null);
    const isRtl = useMemo(() => i18n.language !== 'en', [i18n.language]);
    const localeText = useMemo(() => (isRtl ? AG_GRID_LOCALE_EG : AG_GRID_LOCALE_EN), [isRtl]);
    const containerStyle = useMemo(() => ({ width: "100%", height: "70vh" }), []);
    const colDefs = useMemo(() => [
        enableActions ? {
            field: t(AppStrings.actions),
            cellRenderer: actionsCellRenderer,
            cellRendererParams: actions,

        } : { width: 0 },
        ...dynamicColumns,
    ], [dynamicColumns, t, actionsCellRenderer, actions, enableActions]);

    useEffect(() => {
        const handleLanguageChange = () => {
            if (gridApiRef.current) {
                gridApiRef.current.refreshCells();
            }
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => i18n.off('languageChanged', handleLanguageChange);
    }, [i18n]);

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
            checkboxes: false,
            enableClickSelection: true,
        };
    }, []);




    const defaultColDef = useMemo(() => {
        return {
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
            },
            resizable: true,

        };
    }, []);


    <AgGridReact rowSelection={rowSelection} />

    return (
        <div style={containerStyle} className="ag-theme-alpine w-100 p-1 mt-4">
            <AgGridReact
                key={i18n.language}
                rowSelection={rowSelection}
                loading={isLoading}
                pagination={true}
                paginationPageSize={10}
                rowData={rowData}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                columnDefs={colDefs}
                quickFilterText={quickFilterText}
                defaultColDef={defaultColDef}
                domLayout='normal'
                enableRtl={isRtl}
                localeText={localeText}

            />
        </div>
    );
};

export default AgGridTable;
