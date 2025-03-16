import React from 'react'
import EditComponent from '../../components/common/EditComponent';
import FlavorForm from '../../components/flavor/FlavorForm';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useFlavorManagement from '../../hook/useFlavorManagement';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import AppStrings from '../../config/appStrings';
import { routes } from '../../config/constants';

const EditFlavor = () => {
    const loaction = useLocation()
    const { t } = useTranslation();


    return (
        <EditComponent
            errorMessage={AppStrings.something_went_wrong}
            successMessage={AppStrings.flavor_updated_successfully}
            fetchHook={useFlavorManagement}
            icon={faHeart}
            title={t(AppStrings.edit_flavor) + '  | ' + loaction.state.FlavorNo}
            path={routes.flavor.list}
            Form={FlavorForm}
            editData={loaction.state}
        />
    )
}

export default EditFlavor
