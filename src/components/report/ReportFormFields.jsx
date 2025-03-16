import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'


const ReportFormFields = ({ onChange, fields, register, errors, options, setValue, watch }) => {
    return (
        <FormFieldsComponent triggerEvent={onChange} errors={errors} register={register} setValue={setValue} options={options} watch={watch} fields={fields} />
    )
}

export default ReportFormFields
