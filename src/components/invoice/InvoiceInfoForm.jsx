import React from 'react'
import useValidators from '../../hooks/useValidators';
import InvoiceInfoFormFields from './InvoiceInfoFormFields';
import FormComponent from './../common/FormComponent';
import ListInvoiceItems from './ListInvoiceItems';

const InvoiceInfoForm = ({ onSubmit, onFirstSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { invoiceSchema, invoiceUpdatedSchema } = useValidators();


    return (
        <FormComponent customSubmit={true} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? invoiceSchema : invoiceUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <InvoiceInfoFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    {
                        isAdd && <>
                            <ListInvoiceItems isEdit={!isAdd} onFirstSubmit={onFirstSubmit} invoice={{
                                ...defaultValuesEdit,
                                Warehouse: watch('Warehouse'),
                                InvoiceNo: watch('InvoiceNo'),
                                DocDate: watch('DocDate'),
                                Supplier: watch('Supplier'),
                                PayType: watch('PayType'),
                                Note: watch('Note'),
                            }} />
                        </>
                    }
                </>
            }
        </FormComponent>
    )
}

export default InvoiceInfoForm
