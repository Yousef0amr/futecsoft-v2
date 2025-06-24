import React from 'react'
import FormComponent from '../common/FormComponent';
import UserGroupFormFields from './UserGroupFormFields';
import useValidators from '../../hooks/useValidators';

const UserGroupForm = ({  isSuccess , enableReset ,onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { userGroupSchema } = useValidators();
    return (
        <FormComponent isSuccess={isSuccess} enableReset={enableReset} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={userGroupSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <UserGroupFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default UserGroupForm
