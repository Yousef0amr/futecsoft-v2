import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { enUS, arSD } from '@mui/x-data-grid/locales';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import DialogModel from './DialogModel';
import DeleteComponent from './DeleteComponent';

function EditToolbar({ columns, id, setRows, setRowModesModel }) {
    const { t, i18n } = useTranslation();

    const handleClick = () => {
        const defaultData = columns.reduce((acc, column) => {
            acc[column.field] = '';
            return acc;
        }, {});

        const newRow = { id, ...defaultData, isNew: true };

        setRows(oldRows => [...oldRows, newRow]);
        setRowModesModel(oldModel => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit }
        }));
    };

    return (
        <GridToolbarContainer
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                padding: '10px'
            }}
        >
            <div style={{ flexGrow: 1, textAlign: i18n.language === 'en' ? 'right' : 'left' }}>
                <GridToolbarQuickFilter />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                    variant='outlined'
                    sx={{
                        textTransform: 'capitalize',
                        backgroundColor: 'var(--border-color-1)',
                        borderColor: 'var(--border-color-1)',
                        fontSize: '14px',
                        color: '#ccc'
                    }}
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                >
                    {t(AppStrings.add_new_item)}
                </Button>
            </div>
        </GridToolbarContainer>
    );
}

export default function TableWithCRUD({
    columns,
    onSubmit,
    handleOnDeleteClick,
    initialRows,
    isDeleting,
    isLoading,
    totalRowCount = 0 // ✅ added prop for proper pagination
}) {
    const { t, i18n } = useTranslation();
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [open, setOpen] = React.useState({ data: null, isOpen: false });

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    React.useEffect(() => {
        if (initialRows && Array.isArray(initialRows)) {
            setRows(initialRows.map((row, index) => ({ ...row, id: index })));
        }
    }, [initialRows]);

    const handleEditClick = id => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = data => () => {
        setRowModesModel({ ...rowModesModel, [data.id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = async () => {
        const data = open.data;
        const res = await handleOnDeleteClick(data.row);
        handleClose();
        if (res?.Success) {
            setRows(rows.filter(row => row.id !== data.id));
        }
    };

    const handleCancelClick = id => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = rows.find(row => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const processRowUpdate = async newRow => {
        const res = await onSubmit(newRow);
        if (res?.Success) {
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        }
        setRows(rows => rows.filter(row => row.id !== newRow.id));
        return {};
    };

    const handleRowModesModelChange = newRowModesModel => {
        setRowModesModel(newRowModesModel);
    };

    const handleOpen = data => {
        setOpen({ data, isOpen: true });
    };

    const handleClose = () => {
        setOpen({ data: null, isOpen: false });
    };

    return (
        <div dir={i18n.language === 'en' ? 'ltr' : 'rtl'} style={{ height: 500, width: '100%' }}>
            <DataGrid
                paginationMode="server"
                rowCount={totalRowCount} // ✅ Fixed count warning
                rows={rows}
                density="compact"
                editMode="row"
                loading={isLoading}
                columns={[
                    {
                        field: 'actions',
                        type: 'actions',
                        headerName: t(AppStrings.actions),
                        width: 200,
                        align: 'center',
                        getActions: data => {
                            const isInEditMode = rowModesModel[data.id]?.mode === GridRowModes.Edit;
                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label="Save"
                                        sx={{ color: 'primary.main' }}
                                        onClick={handleSaveClick(data)}
                                    />,
                                    <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        onClick={handleCancelClick(data.id)}
                                        color="inherit"
                                    />
                                ];
                            }

                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    onClick={handleEditClick(data.id)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={() => handleOpen(data)}
                                    color="inherit"
                                />
                            ];
                        }
                    },
                    ...columns
                ]}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                localeText={
                    i18n.language === 'en'
                        ? enUS.components.MuiDataGrid.defaultProps.localeText
                        : arSD.components.MuiDataGrid.defaultProps.localeText
                }
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel,
                        id: rows.length,
                        columns
                    }
                }}
                sx={{
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& .MuiDataGrid-columnHeader': {
                        justifyContent: 'center'
                    }
                }}
            />
            <DialogModel open={open.isOpen}>
                <DeleteComponent
                    handleDelete={handleDeleteClick}
                    handleCancel={handleClose}
                    isLoading={isDeleting}
                />
            </DialogModel>
        </div>
    );
}
