import React from 'react'
import FormComponent from '../common/FormComponent';
import TaxFormFields from './TaxFormFields';
import useValidators from '../../hooks/useValidators';

const TaxForm = ({ onSubmit, isLoading, isSuccess, enableReset, defaultValuesEdit = {} }) => {
    const { taxSchema } = useValidators();
    return (
        <FormComponent isSuccess={isSuccess} enableReset={enableReset} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={taxSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <TaxFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default TaxForm
