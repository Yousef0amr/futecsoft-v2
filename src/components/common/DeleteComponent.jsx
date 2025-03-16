import React from 'react';
import { useTranslation } from 'react-i18next';
import AppStrings from './../../config/appStrings';
import SpinnerLoader from './Spinner';

const DeleteCard = ({ handleDelete, handleCancel, isLoading }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    return (
        <div
            className="delete-card"
        >
            <div className="card-content">
                <p className="card-heading">{t(AppStrings.delete_title)}</p>
                <p className="card-description">{t(AppStrings.delete_confirmation)}</p>
            </div>
            <div
                className="card-button-wrapper"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
                <button className="card-button secondary" onClick={handleCancel}>{t(AppStrings.cancel)}</button>
                <button className="card-button primary" onClick={handleDelete}>{isLoading ? <SpinnerLoader /> : t(AppStrings.delete)}</button>
            </div>
        </div>
    );
};

export default DeleteCard;
