import { Button } from 'react-bootstrap'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../config/appStrings'
import serverError from '../../assets/images/serverError.png'

const ErrorBoundaryComponent = () => {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{
            height: '100vh',
            width: '100%',
            gap: '20px'
        }}>
            <img src={serverError} alt="404" style={{ width: '400px', maxWidth: '100%', maxHeight: '400px' }} />
            <Button variant="danger" onClick={() => window.location.reload()}>{t(AppStrings.reload_page)}</Button>
            <p >{t(AppStrings.try_in_a_while)}</p>
        </div>
    )
}

export default ErrorBoundaryComponent
