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
    handleSaveOption,
    selectedOption,
    options
}) => {
    const { t } = useTranslation()
    return (
        <Dialog open={open} onClose={handleClose} onKeyDown={(e) => e.key === 'Enter' && handleSaveOption()}>
            <DialogContent>
                <LazySelect options={options} selectedOption={selectedOption} setSelectedOption={handleSelectChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t(AppStrings.cancel)}</Button>
                <Button variant="contained" className='bg-[var(--primary-color)]'  onClick={() =>
                    handleSaveOption()}
                >
                    {t(AppStrings.save)}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SearchModal