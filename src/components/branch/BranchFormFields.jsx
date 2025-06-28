
import { branchFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const BranchFormFields = ({ setValue, register, errors }) => {
    return (
        <FormFieldsComponent setValue={setValue} errors={errors} register={register} fields={branchFormFields} />
    )
}

export default BranchFormFields
