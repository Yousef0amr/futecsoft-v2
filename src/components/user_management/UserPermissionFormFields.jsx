import React from 'react'
import { permissionsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const UserPermissionFormFields = ({ errors, register, watch, setValue }) => {
    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={permissionsFormFields} />
    )
}

export default UserPermissionFormFields
