import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import CategoryFormFields from './CategoryFormFields1';

const CategoryForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { categorySchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={categorySchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <CategoryFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default CategoryForm
