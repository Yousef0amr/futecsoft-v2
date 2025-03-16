import React from 'react'
import useValidators from '../../hooks/useValidators';
import FormComponent from '../common/FormComponent';
import OfferFormFields from './OfferFormFields';

const OfferForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { offerSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={offerSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <OfferFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default OfferForm
