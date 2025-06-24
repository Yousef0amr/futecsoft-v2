import React from 'react'
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';
import CurrencyFormFields from './CurrencyFormFields';

const CurrencyForm = ({ onSubmit, isLoading, isSuccess, enableReset, defaultValuesEdit = {} }) => {
    const { currencySchema } = useValidators();
    return (
        <FormComponent isSuccess={isSuccess} enableReset={enableReset} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={currencySchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <CurrencyFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default CurrencyForm