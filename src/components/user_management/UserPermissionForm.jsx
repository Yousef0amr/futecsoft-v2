import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import UserPermissionFormFields from './UserPermissionFormFields'

const UserPermissionForm = ({ isSuccess, onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { permissionSchema } = useValidators();
    return (
        <FormComponent isSuccess={isSuccess} enableReset={false} enableUpdateLocation={false} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={permissionSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <UserPermissionFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default UserPermissionForm
