import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import DiscountFormFields from './DiscountFormFields';


const DiscountForm = ({ onSubmit, isLoading,enableReset, isSuccess ,defaultValuesEdit = {} }) => {
    const { discountSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading}  enableReset={enableReset} defaultValues={defaultValuesEdit} isSuccess={isSuccess} schema={discountSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <DiscountFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default DiscountForm
