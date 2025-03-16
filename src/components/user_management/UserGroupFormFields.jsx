import React from 'react'
import { userGroupsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const UserGroupFormFields = ({ errors, register, watch, setValue }) => {
    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={userGroupsFormFields} />
    )
}

export default UserGroupFormFields
