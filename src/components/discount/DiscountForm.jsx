import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import DiscountFormFields from './DiscountFormFields';


const DiscountForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { discountSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={discountSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <DiscountFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default DiscountForm
