import React from 'react'
import FormComponent from '../common/FormComponent';
import UserGroupFormFields from './UserGroupFormFields';
import useValidators from '../../hooks/useValidators';

const UserGroupForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { userGroupSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={userGroupSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <UserGroupFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default UserGroupForm
