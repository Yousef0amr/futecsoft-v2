import React from 'react'
import FormComponent from '../common/FormComponent'
import VoucherProvideFormFields from './VoucherProvideFormFields'
import ListVoucherProvideItems from './ListVoucherProvideItems'
import useValidators from '../../hooks/useValidators'

const VoucherProvideForm = ({ customSubmit, onFirstSubmit, onSubmit, isLoading, defaultValuesEdit = {}, isAdd = false }) => {
    const { voucherProvideSchema } = useValidators();



    return (
        <FormComponent customSubmit={customSubmit} isLoading={isLoading} defaultValues={defaultValuesEdit} schema={voucherProvideSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) =>
                <>
                    <VoucherProvideFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
                    <ListVoucherProvideItems isAdd={isAdd} onFirstSubmit={onFirstSubmit} voucher={
                        {
                            ...defaultValuesEdit,
                            FromWarehouse: watch('FromWarehouse'),
                            Warehouse: watch('Warehouse'),
                            ByUser: watch('ByUser'),
                            ReqDate: watch('ReqDate'),
                            Notes: watch('Notes'),
                            Manual: watch('Manual'),
                            FromDate: watch('FromDate'),
                            ToDate: watch('ToDate'),
                            DayName: watch('DayName'),
                            DiffRate: watch('DiffRate'),
                            AllDays: watch('AllDays'),
                            Provided: watch('Provided'),
                        }
                    } />

                </>
            }
        </FormComponent>
    )
}

export default VoucherProvideForm

