import React from 'react'
import FlavorFormFields from './FlavorFormFields';
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';

const FlavorForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { flavorSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={flavorSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <FlavorFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default FlavorForm
