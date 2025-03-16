import React, { useMemo } from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetInvoicesByDateQuery
} from '../../features/reportsControllerSlice';
import { reportFormFields } from '../../config/formFields';
import { useInvoicesByDateColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';


const InvoicesByDate = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [getInvoicesByDate, { data, isLoading }] = useLazyGetInvoicesByDateQuery();
    const { invoiceByDateSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});


    const branches = !isLoadingBranches
        ? branchesData.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];


    const onSubmit = async (data) => {
        await getInvoicesByDate(data).unwrap();
        setSearchData(data);
    }

    const calculateInvoiceSummary = useMemo(() => (invoices = []) => {
        return invoices?.reduce(
            (summary, invoice) => {
                summary.totalDiscount += invoice.InvoiceDiscountTotal || 0;
                summary.totalGrandTotal += invoice.InvoiceGrandTotal || 0;
                summary.totalSubTotal += invoice.InvoiceSubTotal || 0;
                summary.totalTaxTotal += invoice.InvoiceTaxTotal || 0;
                summary.invoiceCount += 1;
                return summary;
            },
            {
                invoiceCount: 0,
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
            title={AppStrings.invoices_by_date}
            icon={faReceipt}
            data={data}
            fields={reportFormFields}
            schema={invoiceByDateSchema}
            options={{ Warehouse: branches ? branches : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            searchData={searchData}
            useComponentsColDefs={useInvoicesByDateColDefs()} />

    )
}

export default InvoicesByDate
