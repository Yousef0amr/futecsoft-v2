
import FormFieldsComponent from '../common/FormFieldsComponent'
import { taxsFormFields } from '../../config/formFields'
import { useAutoSyncField } from '../../hooks/useAutoSyncField'

const TaxFormFields = ({ register, errors, setValue, watch }) => {
useAutoSyncField({ watch, sourceField: "TaxAr", targetField: "TaxEn", setValue })   
    return (
        <FormFieldsComponent errors={errors} register={register} watch={watch} setValue={setValue} fields={taxsFormFields} />
    )
}

export default TaxFormFields
