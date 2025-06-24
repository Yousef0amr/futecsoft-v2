import React, { useEffect } from 'react'
import { discountsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'

const DiscountFormFields = ({ register, errors, watch, setValue }) => {

        const nameAr = watch("DiscountTypeAR");
         const nameEn = watch("DiscountTypeEN");
        
        useEffect(() => {
            if (nameAr && !nameEn) {
                setValue("DiscountTypeEN", nameAr);
            }
        }, [nameEn, nameAr, setValue]);
    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={discountsFormFields} />
    )
}

export default DiscountFormFields
