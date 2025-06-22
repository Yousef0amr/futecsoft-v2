
import useValidators from '../../hooks/useValidators';
import InvoiceInfoFormFields from './InvoiceInfoFormFields';
import FormComponent from './../common/FormComponent';
import ListInvoiceItems from './ListInvoiceItems';
import InvoiceInfoDetlFormFields from './InvoiceInfoDetlFormFields';
import { Stack } from '@mui/material';
import { useState } from 'react';

const InvoiceInfoForm = ({ onSubmit, tableRef,  isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { invoiceSchema, invoiceUpdatedSchema } = useValidators();
    const [enableDiscountPre, setEnableDiscounPret] = useState(false)


    const handleDiscount = (value) => {
        setEnableDiscounPret(value.target.checked)
    }


    return (
        <FormComponent  isLoading={isLoading} defaultValues={defaultValuesEdit} schema={isAdd ? invoiceSchema : invoiceUpdatedSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <Stack gap={2}>
                    <InvoiceInfoFormFields register={register} errors={errors} setValue={setValue} watch={watch} />

                    <ListInvoiceItems tableRef={tableRef}  setValue={setValue} isAdd={isAdd} invoice={{
                        ...defaultValuesEdit,
                        Warehouse: watch('Warehouse'),
                        InvoiceNo: watch('InvoiceNo'),
                        DocDate: watch('DocDate'),
                        Supplier: watch('Supplier'),
                        PayType: watch('PayType'),
                        Note: watch('Note'),
                        DiscountPercentage: watch('DiscountPercentage'),
                        Tax: watch('Tax'),
                        Discount: watch('Discount'),
                        DiscountValue: watch('DiscountValue'),
                        PriceIncludeTax: watch('PriceIncludeTax'),
                        enableDiscountPre
                    }} />
                    <InvoiceInfoDetlFormFields enableDiscount={enableDiscountPre} handleDiscount={handleDiscount} register={register} errors={errors} setValue={setValue} watch={watch} isAdd={isAdd} />
                </Stack>
            }
        </FormComponent >
    )
}

export default InvoiceInfoForm
