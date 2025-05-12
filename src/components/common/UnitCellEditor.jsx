// components/UnitCellEditor.tsx
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';

const UnitCellEditor = forwardRef((props, ref) => {
    const { value, units, stopEditing } = props;
    const [selectedValue, setSelectedValue] = useState(value);


    // AG Grid API: return the value to save
    useImperativeHandle(ref, () => ({
        getValue: () => selectedValue,
    }));

    const handleChange = (event) => {
        setSelectedValue(Number(event.target.value));
    };

    const handleSave = () => {
        setOpen(false);
        stopEditing(); // Tell AG Grid we're done
    };

    const handleClose = () => {
        setOpen(false);
        stopEditing();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Unit</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="unit-select-label">Unit</InputLabel>
                    <Select
                        labelId="unit-select-label"
                        value={selectedValue}
                        onChange={handleChange}
                        label="Unit"
                    >
                        {units.map(unit => (
                            <MenuItem key={unit.value} value={unit.value}>
                                {unit.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
});

export default UnitCellEditor;
