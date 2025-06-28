
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';
import BranchFormFields from './BranchFormFields';



const BranchForm = ({ onSubmit, isLoading, defaultValuesEdit = {}, isSuccess, enableReset }) => {
    const { branchSchema } = useValidators();

    return (
        <FormComponent isSuccess={isSuccess} isLoading={isLoading} enableReset={enableReset} defaultValues={defaultValuesEdit} schema={branchSchema} onSubmit={onSubmit}>
            {({ watch, register, errors, setValue }) => (
                <BranchFormFields watch={watch} setValue={setValue} register={register} errors={errors} />
            )}
        </FormComponent>
    );
};

export default BranchForm;
