import React from 'react'
import FormComponent from '../common/FormComponent';
import UserFormFields from './UserFormFields';
import useValidators from '../../hooks/useValidators';

const UserForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { userSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={userSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <UserFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default UserForm
