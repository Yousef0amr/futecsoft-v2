import React, { useMemo } from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetReturnByItemsQuery
} from '../../features/reportsControllerSlice';
import { reportFormFields } from '../../config/formFields';
import { useReturnByItemColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';
const ReturnByItems = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [getReturnByItems, { data, isLoading }] = useLazyGetReturnByItemsQuery();
    const { invoiceByDateSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});


    const branches = !isLoadingBranches
        ? branchesData.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];


    const onSubmit = async (data) => {
        await getReturnByItems(data).unwrap();
        setSearchData(data);
    }

    const calculateInvoiceSummary = useMemo(() => (invoices = []) => {
        return invoices?.reduce(
            (summary, invoice) => {
                summary.totalDiscount += invoice.Discount || 0;
                summary.totalGrandTotal += invoice.GrandTotal || 0;
                summary.totalSubTotal += invoice.SubTotal || 0;
                summary.totalTaxTotal += invoice.TaxValue || 0;
                summary.quantity += invoice.Qty || 0;
                summary.invoiceCount += 1;
                return summary;
            },
            {
                invoiceCount: 0,
                quantity: 0,
                totalSubTotal: 0,
                totalDiscount: 0,
                totalTaxTotal: 0,
                totalGrandTotal: 0,
            }
        );
    }, []);




    return (
        <ListReport summary={
            calculateInvoiceSummary(data)
        }
            title={AppStrings.return_items}
            icon={faReceipt}
            data={data}
            fields={reportFormFields}
            schema={invoiceByDateSchema}
            options={{ Warehouse: branches ? branches : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useReturnByItemColDefs()}
            searchData={searchData}
        />
    )
}

export default ReturnByItems
