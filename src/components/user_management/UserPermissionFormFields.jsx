import React, { useCallback, useEffect } from 'react'
import { permissionsFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import CheckBox from '../common/CheckBox'

const UserPermissionFormFields = ({ errors, register, watch, setValue }) => {

    const [isAllChecked, setIsAllChecked] = React.useState(false);
const selectAllPermissions = useCallback( (isChecked) => {
  setIsAllChecked(isChecked);
  permissionsFormFields.forEach(field => setValue(field.name, isChecked));
}, [ setValue, setIsAllChecked]); 


useEffect(() => {
return () => {
  if (isAllChecked) {
    selectAllPermissions(false);
  }
}
}, [isAllChecked, selectAllPermissions]);

    return (
        <>
  <CheckBox 
  label="all" 
  isChecked={isAllChecked} 
  onChange={selectAllPermissions} 
  required={false} 
/>
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} watch={watch} fields={permissionsFormFields} />
        </>
        
    )
}

export default UserPermissionFormFields
