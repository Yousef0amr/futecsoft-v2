import React from 'react'

import DialogModel from '../common/DialogModel';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';
import { Button } from 'react-bootstrap';

const Relogin = ({ handleNavigateToLogin, showLoginModal, setShowLoginModal }) => {
    const { t } = useTranslation();

    return (
        <DialogModel open={showLoginModal} onClose={() => setShowLoginModal(false)}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3>{t(AppStrings.session_expired)}</h3>
                <p>{t(AppStrings.relogin_message)}</p>
                <Button variant="danger" onClick={handleNavigateToLogin}>{t(AppStrings.relogin)}</Button>
            </div>
        </DialogModel>
    )
}

export default Relogin
