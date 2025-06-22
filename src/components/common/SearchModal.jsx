import React from 'react'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import LazySelect from './LazySelect'
import { Button } from '@mui/material'



const SearchModal = ({
    open,
    handleClose,
    handleSelectChange,
    selectedOption,
    options
}) => {
    const { t } = useTranslation()

    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <LazySelect options={options} selectedOption={selectedOption} setSelectedOption={handleSelectChange}  />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t(AppStrings.cancel)}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SearchModal