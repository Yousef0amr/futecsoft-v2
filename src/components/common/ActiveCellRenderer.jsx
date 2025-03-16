import React from 'react'
import { useTranslation } from 'react-i18next';
import AppStrings from '../../config/appStrings';

const ActiveCellRenderer = (props) => {
    const { t } = useTranslation();
    return props.value ? (
        <span>
            {props.value ? t(AppStrings.yes) : t(AppStrings.no)}
        </span>
    ) : (
        <React.Fragment></React.Fragment>
    );
}

export default ActiveCellRenderer
