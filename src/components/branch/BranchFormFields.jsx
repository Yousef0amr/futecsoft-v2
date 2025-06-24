import React, { useEffect } from 'react'
import { branchFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const BranchFormFields = ({ setValue ,watch ,register, errors }) => {

 const branchNameAr = watch("BranchNameAr");
 const branchNameEn = watch("BranchNameEn");

useEffect(() => {
    if (branchNameAr && !branchNameEn) {
        setValue("BranchNameEn", branchNameAr);
    }
}, [branchNameAr, setValue, branchNameEn]);

    return (
        <FormFieldsComponent errors={errors} register={register} fields={branchFormFields} />
    )
}

export default BranchFormFields
