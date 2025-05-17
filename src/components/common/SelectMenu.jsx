import React, { useEffect, useMemo, useState } from 'react';
import { FormControl, MenuItem, Select, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SelectMenu = ({
    options,
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

    const menuItems = useMemo(() => {
        const items = filteredOptions.map(option => (
            <MenuItem key={option.value} value={String(option.value)}>
                {multiple && (
                    <Checkbox checked={selectedValue.includes(String(option.value))} />
                )}
                {option.label}
            </MenuItem>
        ));

        if (!multiple) {
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
    }, [filteredOptions, selectedValue, multiple, t]);

    useEffect(() => {
        if (options.length > 0 && selectedValue !== undefined) {
            const currentValue = watch(name);
            const newValue = multiple ? selectedValue : String(selectedValue);
            if (String(currentValue) !== String(newValue)) {
                setValue(name, newValue);
                onChange?.({
                    target: {
                        name,
                        value: newValue,
                    },
                });
            }
        }
    }, [options, selectedValue, name, setValue, onChange, watch, multiple]);

    return (
        <FormControl className="select-menu" style={{ width: '100%' }}>
            <span className="select-label mb-2">
                {t(label)}
                {required && <span style={{ color: 'red' }}>*</span>}
            </span>

            <Select
                labelId={`${label}-select-label`}
                id={`${label}-select`}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={selectedValue}
                multiple={multiple}
                onKeyDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onChange={(event) => {
                    const value = multiple
                        ? event.target.value.map(String)
                        : String(event.target.value);
                    setValue(name, value);
                    onChange?.({
                        target: {
                            name,
                            value,
                        },
                    });
                }}
                displayEmpty
                style={{
                    backgroundColor: 'var(--background-color)',
                    borderRadius: '10px',
                    height: '35px',
                    padding: '0px 12px',
                    fontSize: '14px',
                    width: '100%',
                    transition: 'box-shadow 0.3s ease',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color-2)',
                }}
                IconComponent={(props) => (
                    <ArrowDropDownIcon {...props} style={{ color: 'var(--border-color-2)' }} />
                )}
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
                    MenuListProps: {
                        onClick: (e) => {
                            e.stopPropagation();
                            e.preventDefault();
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
                        placeholder={t(`${AppStrings.search}`)}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'var(--background-color)',
                            borderRadius: '4px',
                            height: '30px',
                            padding: '0px 12px',
                            fontSize: '14px',
                            width: '100%',
                            transition: 'box-shadow 0.3s ease',
                            color: 'var(--text-color)',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </MenuItem>
                {menuItems}
            </Select>

            {errors[name] && (
                <div className="error-message">{errors[name].message}</div>
            )}
        </FormControl>
    );
};

export default SelectMenu;
