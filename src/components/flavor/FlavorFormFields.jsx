import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent'
import { flavorsFormFields } from '../../config/formFields'
import useBranchManagement from '../../hook/useBranchManagement'
import useCategoryManagement from '../../hook/useCategoryManagement'

const FlavorFormFields = ({ register, errors, setValue, watch }) => {
  const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategoryManagement();
  const branches = !isLoadingBranches
    ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
    : [];
  const categories = !isLoadingCategories
    ? categoriesData?.map((item) => ({ value: item.Id, label: item.NameAr }))
    : [];

  return (
    <FormFieldsComponent fields={flavorsFormFields} options={{ WareHouse: branches, Category: categories }} setValue={setValue} errors={errors} register={register} watch={watch} />
  )
}

export default FlavorFormFields
