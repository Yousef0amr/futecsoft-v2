import React from 'react'
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import PurchaseOrderFormFields from './PurchaseOrderFormFields'
import ListPurchaseOrderItems from './ListPurchaseOrderItems'


const PurchaseOrderForm = ({ onSubmit, onFirstSubmit, customSubmit = false, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { PurchaseOrderForm } = useValidators();
    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={PurchaseOrderForm} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <PurchaseOrderFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListPurchaseOrderItems isAdd={isAdd} onFirstSubmit={onFirstSubmit} invoice={{
                        ...defaultValuesEdit,
                        Warehouse: watch('Warehouse'),
                        LineDate: watch('LineDate'),
                        Status: watch('Status'),
                        Note: watch('Note'),
                    }} />
                </>
            }
        </FormComponent>
    )
}

export default PurchaseOrderForm