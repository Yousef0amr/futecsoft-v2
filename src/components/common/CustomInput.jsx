import React from 'react'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings';

const CustomInput = ({ value, label, required, handleModalClick, name }) => {
    const { t } = useTranslation();
    return (
        <div >
            <div style={{ color: 'var(--text-color)', marginBottom: '6px' }}>
                {t(label)}
                {required && <span style={{ color: 'red' }}>*</span>}
            </div>
            <button type='button' onClick={handleModalClick(name)} style={{
                backgroundColor: 'var(--background-color)',
                borderRadius: '10px',
                height: '35px',
                padding: '0px 12px',
                fontSize: '14px',
                width: '100%',
                transition: 'box-shadow 0.3s ease',
                color: 'var(--text-color)',
                border: '1px solid var(--border-color-2)',
            }} className='text-end'>

                {
                    value ? value : <span style={{ opacity: '0.5' }}>
                        {t(AppStrings.enter) + ' '} {t(label)}
                    </span>
                }
            </button>
        </div>
    )
}

export default CustomInput
