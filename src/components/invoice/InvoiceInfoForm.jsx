import React from 'react'
import useValidators from '../../hooks/useValidators';
import InvoiceInfoFormFields from './InvoiceInfoFormFields';
import FormComponent from './../common/FormComponent';
import ListInvoiceItems from './ListInvoiceItems';


const InvoiceInfoForm = ({ onSubmit, onFirstSubmit, customSubmit = false, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { invoiceSchema, invoiceUpdatedSchema } = useValidators();


    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? invoiceSchema : invoiceUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <InvoiceInfoFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListInvoiceItems isAdd={isAdd} onFirstSubmit={onFirstSubmit} invoice={{
                        ...defaultValuesEdit,
                        Warehouse: watch('Warehouse'),
                        InvoiceNo: watch('InvoiceNo'),
                        DocDate: watch('DocDate'),
                        Supplier: watch('Supplier'),
                        PayType: watch('PayType'),
                        Note: watch('Note'),
                        DiscountPercentage: watch('DiscountPercentage'),
                        TaxPercentage: watch('TaxPercentage'),
                        Tax: watch('Tax'),
                        Discount: watch('Discount'),
                        PriceIncludeTax: watch('PriceIncludeTax'),
                    }} />
                </>
            }
        </FormComponent>
    )
}

export default InvoiceInfoForm
