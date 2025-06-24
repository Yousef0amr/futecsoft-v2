import React, { useEffect } from 'react'
import { unitsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const UnitFormFields = ({ register, errors, watch, setValue }) => {

     const unitNameAr = watch("Unit_AR");
     const unitNameEn = watch("Unit_EN");
    
    useEffect(() => {
        if (unitNameAr && !unitNameEn) {
            setValue("Unit_EN", unitNameAr);
        }
    }, [unitNameAr, setValue, unitNameEn]);
    return (
        <FormFieldsComponent errors={errors} register={register} watch={watch} setValue={setValue} fields={unitsFormFields} />
    )
}

export default UnitFormFields
