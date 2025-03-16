import React from 'react'
import useValidators from '../../hooks/useValidators';
import InvoiceItemFormFields from './InvoiceItemFormFields';
import FormComponent from './../common/FormComponent';
const InvoiceItemForm = ({ enableReset, onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { invoiceSchema } = useValidators();
    return (
        <FormComponent enableReset={enableReset} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={invoiceSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <InvoiceItemFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default InvoiceItemForm
