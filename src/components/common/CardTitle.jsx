import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CardTitle = ({ icon, title, navButton, children }) => {
    return (
        <div className='w-100 d-flex justify-content-between align-items-center flex-wrap gap-4'>

            <div style={{
                fontWeight: '500', fontSize: '20px',
                color: 'var(--text-color)', display: 'flex', alignItems:
                    'center', justifyContent: 'start', gap: '10px'
            }}>

                <FontAwesomeIcon color='var(--secondary-color)' icon={icon} /> {title}

            </div>

            {children}
            {navButton}
        </div>
    )
}

export default CardTitle
