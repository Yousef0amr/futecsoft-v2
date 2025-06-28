import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    Checkbox
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SelectMenu = ({
    options = [],
    name,
    setValue,
    label,
    watch = () => { },
    multiple = false,
    onChange,
    required,
    errors,
    isLoading,
}) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    const handleClose = () => {
        setOpen(false);
        setSearchTerm('');
    };

    const handleOpen = () => setOpen(true);

    const availableOptionValues = options.map(opt => String(opt.value));
    const rawValue = watch(name);

    const selectedValue = multiple
        ? Array.isArray(rawValue)
            ? rawValue.map(String).filter(val => availableOptionValues.includes(val))
            : []
        : rawValue !== undefined && availableOptionValues.includes(String(rawValue))
            ? String(rawValue)
            : '';

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    const allOptionValues = options.map(opt => String(opt.value));
    const allSelected = multiple && selectedValue.length === allOptionValues.length;
    const hasInitializedDefault = useRef(false);
    const hasManuallyCleared = useRef(false);

    const handleChange = (event) => {
        let value = event.target.value;

        if (multiple) {
            const lastValue = value[value.length - 1];

            if (lastValue === '__all__') {
                const isAllSelected = selectedValue.length === allOptionValues.length;
                const newValue = isAllSelected ? [] : allOptionValues;

                // If toggled off, treat as manual clear
                hasManuallyCleared.current = isAllSelected;

                setValue(name, newValue);
                onChange?.({ target: { name, value: newValue } });
            } else {
                // Manually cleared (i.e., no selection)
                hasManuallyCleared.current = value.length === 0;

                setValue(name, value);
                onChange?.({ target: { name, value } });
            }
        } else {
            setValue(name, String(value));
            onChange?.({ target: { name, value: String(value) } });
        }
    };

    const menuItems = useMemo(() => {
        const items = filteredOptions.map(option => (
            <MenuItem key={option.value} value={String(option.value)}>
                {multiple && (
                    <Checkbox checked={selectedValue.includes(String(option.value))} />
                )}
                {option.label}
            </MenuItem>
        ));

        if (multiple) {
            items.unshift(
                <MenuItem key="__all__" value="__all__">
                    <Checkbox
                        checked={allSelected}
                        indeterminate={selectedValue.length > 0 && !allSelected}
                    />
                    {t(AppStrings.selectAll || 'Select All')}
                </MenuItem>
            );
        } else {
            items.unshift(
                <MenuItem key="clear" value="">
                    {t(AppStrings.clearSelection || 'Clear selection')}
                </MenuItem>
            );
        }

        return items.length > 0 ? items : (
            <MenuItem disabled>
                {t(AppStrings.noDataAvailable)}
            </MenuItem>
        );
    }, [filteredOptions, selectedValue, multiple, t, allSelected]);


    useEffect(() => {
        if (options.length > 0 && selectedValue !== undefined) {
            const currentValue = watch(name);
            const newValue = multiple ? selectedValue : String(selectedValue);

            if (String(currentValue) !== String(newValue)) {
                setValue(name, newValue);
                onChange?.({ target: { name, value: newValue } });
            }
        }
    }, [options, selectedValue, name, setValue, onChange, watch, multiple]);

    useEffect(() => {
        if (
            multiple &&
            options.length > 0 &&
            !hasInitializedDefault.current &&
            !hasManuallyCleared.current &&
            (!Array.isArray(rawValue) || rawValue.length === 0)
        ) {
            const allValues = options.map(opt => String(opt.value));
            setValue(name, allValues);
            onChange?.({ target: { name, value: allValues } });

            hasInitializedDefault.current = true;
        }

        return () => {
            hasInitializedDefault.current = false;
            // Do not reset hasManuallyCleared here; persist across unmount
        };
    }, [multiple, options, rawValue, name, setValue, onChange]);



    return (
        <FormControl className="select-menu" style={{ width: '100%' }}>
            <span className="select-label mb-2">
                {t(label)}{required && <span style={{ color: 'red' }}>*</span>}
            </span>

            <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={selectedValue}
                multiple={multiple}
                onChange={handleChange}
                displayEmpty
                IconComponent={(props) =>
                    isLoading
                        ? <FontAwesomeIcon icon={faSpinner} spin />
                        : <ArrowDropDownIcon {...props} style={{ color: 'var(--border-color-2)' }} />
                }
                style={{
                    backgroundColor: 'var(--background-color)',
                    borderRadius: '10px',
                    height: '35px',
                    padding: '0px 12px',
                    fontSize: '14px',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color-2)',
                }}
                MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                        style: {
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px var(--row-color)',
                            padding: '5px 0',
                            backgroundColor: 'var(--background-color)',
                        },
                    },
                    disableAutoFocusItem: true,
                }}
                renderValue={(selected) => {
                    if (multiple) {
                        return selected.length === 0
                            ? t(AppStrings.choose)
                            : selected
                                .map(val => options.find(opt => String(opt.value) === String(val))?.label)
                                .filter(Boolean)
                                .join(', ');
                    }
                    const valueSelected = options.find(opt => String(opt.value) === String(selected));
                    return valueSelected?.label || t(AppStrings.choose);
                }}
            >
                <MenuItem>
                    <input
                        placeholder={t(AppStrings.search)}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'var(--background-color)',
                            borderRadius: '4px',
                            height: '30px',
                            padding: '0px 12px',
                            fontSize: '14px',
                            width: '100%',
                            color: 'var(--text-color)',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </MenuItem>
                {menuItems}
            </Select>

            {errors?.[name] && (
                <div className="error-message">{errors[name].message}</div>
            )}
        </FormControl>
    );
};

export default SelectMenu;
