
import FormComponent from '../common/FormComponent'
import useValidators from '../../hooks/useValidators'
import SupplierFormFields from './SupplierFormFields'

const SupplierForm = ({ onSubmit ,isSuccess, enableReset, isLoading, defaultValuesEdit = {} }) => {
    const { supplierSchema } = useValidators();
    return (
        <FormComponent isLoading={isLoading} isSuccess={isSuccess} enableReset={enableReset} defaultValues={defaultValuesEdit} schema={supplierSchema} onSubmit={onSubmit}>
            {({ register, errors, setValue, watch }) => (
                <SupplierFormFields register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
        </FormComponent>
    )
}

export default SupplierForm
