import React from 'react'
import { invoiceInfFormFields } from '../../config/formFields'
import FormFieldsComponent from '../common/FormFieldsComponent'
import useBranchManagement from '../../hook/useBranchManagement'
import usePaymentTypeManagement from '../../hook/usePaymentTypeManagement'
import useSupplierManagement from '../../hook/useSupplierManagement'

const InvoiceInfoFormFields = ({ register, errors, setValue, watch }) => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement()
    const branches = !isLoadingBranches
        ? branchesData?.map((item) => ({ value: item.BranchId.toString(), label: item.BranchNameAr }))
        : [];

    const { data: suppliersData, isLoading: isLoadingSuppliers } = useSupplierManagement()
    const suppliers = !isLoadingSuppliers
        ? suppliersData?.map((item) => ({ value: item.SupplierId.toString(), label: item.SupplierCompany }))
        : [];

    const { data: payTypesData, isLoading: isLoadingPayTypes } = usePaymentTypeManagement()
    const payTypes = !isLoadingPayTypes
        ? payTypesData?.map((item) => ({ value: item.Ptype.toString(), label: item.PaymentArDesc }))
        : [];

    return (
        <FormFieldsComponent fields={invoiceInfFormFields} options={{ Warehouse: branches ? branches : [], Supplier: suppliers ? suppliers : [], PayType: payTypes ? payTypes : [] }} setValue={setValue} errors={errors} register={register} watch={watch} />
    )
}

export default InvoiceInfoFormFields
