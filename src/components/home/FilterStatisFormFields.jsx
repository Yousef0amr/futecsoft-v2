import React, { useEffect, useMemo } from 'react';
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const FilterStatisFormFields = ({ setFilter, filter }) => {
    const { t } = useTranslation();
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();

    const branches = useMemo(() => !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [], [branchesData, isLoadingBranches]);


    useEffect(() => {
        if (
            !isLoadingBranches
        ) {
            if (branches?.length > 0 && !filter) {
                setFilter(branches[0]?.value);
            }
        }
    }, [branches, filter, setFilter, isLoadingBranches]);

    return (
        <FormControl >
            <InputLabel style={{ color: "var(--text-color)" }} id="demo-simple-select-label">{t(AppStrings.branch)}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ height: '40px', color: "var(--text-color)" }}
                value={filter || ''}
                label={t(AppStrings.branch)}
                onChange={(e) => setFilter(e.target.value)}
            >
                {branches?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterStatisFormFields;
