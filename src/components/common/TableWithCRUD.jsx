import React, { useMemo, useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from "@mui/material";
import AppStrings from "../../config/appStrings";
import { useTranslation } from "react-i18next";
import { AG_GRID_LOCALE_EG, AG_GRID_LOCALE_EN } from '@ag-grid-community/locale';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSave } from "@fortawesome/free-solid-svg-icons";
import { Close, DeleteOutline } from "@mui/icons-material";
import DialogModel from './../../components/common/DialogModel';
import DeleteComponent from './../../components/common/DeleteComponent';


const TableWithCRUD = ({ columns, initialData = [], onSave, onDelete, isLoading, isDeleting, handleClickEnter, resetTotals }) => {
    const gridRef = useRef(null);
    const { t, i18n } = useTranslation();
    const isRtl = useMemo(() => i18n.language !== 'en', [i18n.language]);
    const localeText = useMemo(() => (isRtl ? AG_GRID_LOCALE_EG : AG_GRID_LOCALE_EN), [isRtl]);

    const [rowData, setRowData] = useState([]);
    const [dirtyRows, setDirtyRows] = useState(new Set());
    const [open, setOpen] = useState({ data: null, isOpen: false });

    const containerStyle = useMemo(() => ({ width: "100%", height: "35vh" }), []);
    const defaultColDef = useMemo(() => ({ resizable: true, flex: 1, editable: true }), []);
    const initialized = useRef(false);


    useEffect(() => {
        if (!isLoading && !initialized.current) {
            const data = initialData.map((row, index) => ({ id: index, ...row }));
            setRowData(data);
            initialized.current = true;
        }
    }, [initialData, isLoading]);

    const handleAddRow = () => {
        const newRow = {
            id: (rowData.length + 1).toString(),
            ...Object.fromEntries(columns.map(col => [col.field, null]))
        };
        setRowData(prev => [...prev, newRow]);
        setDirtyRows(prev => new Set(prev).add(newRow.id));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleClickEnter(gridRef)
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClickEnter]);

    const handleOpen = (data) => {
        setOpen({ data, isOpen: true });
    };

    const handleCancel = () => {
        setOpen({ data: null, isOpen: false });
    };

    const handleSaveAll = async () => {
        const updatedRows = rowData.filter(row => dirtyRows.has(row.id));
        if (updatedRows.length > 0) {
            const result = await onSave(updatedRows)
            if (result?.Success) {
                setDirtyRows(new Set());
            }
        }
    };


    const handleRemoveRow = (data) => {
        const newRowData = rowData.filter(row => +row.id !== +data.id);

        setRowData(newRowData);

        setDirtyRows(prev => {
            const newSet = new Set(prev);
            newSet.delete(data.id);
            return newSet;
        });

        if (newRowData.length <= 0 && resetTotals) {
            resetTotals();
        }
    };


    const colDefs = useMemo(() => [
        {
            headerName: t(AppStrings.actions),
            field: "actions",
            editable: false,
            cellRenderer: (params) => (
                <div className="d-flex gap-2">
                    {<div >
                        <button
                            type='button'
                            className="button-danger bg-transparent border-0"
                            onClick={() => handleRemoveRow(params.data)}
                        >
                            <Close color="error" />
                        </button>
                    </div>}
                    {
                        <div className="buttonCell px-0 py-1">
                            <button
                                type='button'
                                className="button-secondary removeButton "
                                onClick={() => handleOpen(params.data)}
                            >
                                <DeleteOutline />
                            </button>
                        </div>}
                </div>
            ),
        },
        ...columns.map(col => ({ ...col })),
    ], [columns, t]);

    const handleCellValueChanged = (params) => {
        setDirtyRows(prev => {
            const updated = new Set(prev);
            updated.add(params.data.id);
            return updated;
        });
    };

    return (
        <div className="mt-4">
            <div className="mb-3 d-flex gap-2">



                <Button
                    onClick={handleAddRow}
                    className='d-flex align-items-center gap-2'
                    variant='outlined'
                    sx={{
                        textTransform: "capitalize",
                        backgroundColor: 'var(--border-color-1)',
                        borderColor: 'var(--border-color-1)',
                        fontSize: '14px',
                        color: '#ccc'
                    }}
                >
                    <FontAwesomeIcon icon={faAdd} />
                    {t(AppStrings.add_new_unit)}
                </Button>
                <Button
                    onClick={handleSaveAll}
                    disabled={dirtyRows.size === 0}
                    className='d-flex align-items-center gap-2'
                    variant='contained'
                    sx={{
                        fontSize: '16px',
                        color: 'white',
                        padding: '3px',
                        backgroundColor: 'var(--primary-color)',
                    }}
                >
                    <FontAwesomeIcon icon={faSave} />
                    {t(AppStrings.save)}
                </Button>
            </div>
            <div style={containerStyle} className="ag-theme-alpine w-100 p-1">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    editType="fullRow"
                    stopEditingWhenCellsLoseFocus={true}
                    domLayout='normal'
                    loading={isLoading}
                    enableRtl={isRtl}
                    localeText={localeText}
                    getRowId={params => params.data.id}
                    onCellValueChanged={handleCellValueChanged}
                />
            </div>
            {/* <div className="d-flex justify-content-center">
                <Button
                    onClick={handleSaveAll}
                    disabled={dirtyRows.size === 0}
                    className='d-flex align-items-center gap-2 mt-3'
                    variant='contained'
                    sx={{
                        fontSize: '16px',
                        width: '50%',
                        marginTop: '30px',
                        color: 'white',
                        padding: '3px',
                        backgroundColor: 'var(--primary-color)',
                    }}
                >
                    <FontAwesomeIcon icon={faSave} />
                    {t(AppStrings.save)}
                </Button>
            </div> */}

            <DialogModel open={open.isOpen}>
                <DeleteComponent
                    handleDelete={async () => {
                        const result = await onDelete(open.data, handleCancel)
                        handleCancel()
                        if (result?.Success) {
                            setRowData(prev => prev.filter(row => row.id !== open.data.id));
                        }
                    }
                    }
                    handleCancel={handleCancel}
                    isLoading={isDeleting}
                />
            </DialogModel>
        </div>
    );
};

export default TableWithCRUD;
