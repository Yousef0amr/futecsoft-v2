import React from 'react'
import FormFieldsComponent from '../common/FormFieldsComponent';
import useBranchManagement from '../../hook/useBranchManagement';
import useUserGroupManagement from '../../hook/useUserGroupManagement';
import { usersFormFields } from '../../config/formFields';

const UserFormFields = ({ errors, register, watch, setValue }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    const { data: usersGroupData, isLoading: isLoadingGroup } = useUserGroupManagement()
    const usersGroup = !isLoadingGroup
        ? usersGroupData?.map((item) => ({ value: item.GroupId.toString(), label: item.GroupArName }))
        : [];


    return (
        <FormFieldsComponent errors={errors} register={register} setValue={setValue} options={{ Branch: branches, GroupType: usersGroup }} watch={watch} fields={usersFormFields} />
    )
}

export default UserFormFields
