import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    CircularProgress,
    Box,
    Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import LazySelect from './LazySelect'

const SearchModal = ({
    open,
    handleClose,
    handleSelectChange,
    selectedOption,
    options
}) => {
    const { t } = useTranslation()

    const isLoading = !Array.isArray(options) || options.length === 0

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={150}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <LazySelect
                        options={options}
                        selectedOption={selectedOption}
                        setSelectedOption={handleSelectChange}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t(AppStrings.cancel)}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SearchModal
