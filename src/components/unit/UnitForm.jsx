import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import UnitFormFields from './UnitFormFields';

const UnitForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { unitSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={unitSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <UnitFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default UnitForm
