import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import SupplierFormFields from './SupplierFormFields'

const SupplierForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { supplierSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={supplierSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <SupplierFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default SupplierForm
