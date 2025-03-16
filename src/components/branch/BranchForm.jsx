import React from 'react';
import FormComponent from '../common/FormComponent';
import useValidators from '../../hooks/useValidators';
import BranchFormFields from './BranchFormFields';



const BranchForm = ({ onSubmit, isLoading, defaultValuesEdit = {} }) => {
    const { branchSchema } = useValidators();

    return (
        <FormComponent isLoading={isLoading} defaultValues={defaultValuesEdit} schema={branchSchema} onSubmit={onSubmit}>
            {({ register, errors }) => (
                <BranchFormFields register={register} errors={errors} />
            )}
        </FormComponent>
    );
};

export default BranchForm;
