import React, { useMemo } from 'react'
import { useLazyGetSalesCategoryQuery } from '../../features/reportsControllerSlice';
import useValidators from '../../hooks/useValidators';
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { reportFormFields } from '../../config/formFields';
import { useSalesCategoryColDefs } from '../../config/agGridColConfig';
import ListReport from '../../components/report/ListReport';


const CategoriesSales = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [getSalesCategory, { data, isLoading }] = useLazyGetSalesCategoryQuery();
    const { invoiceByDateSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});
    const branches = !isLoadingBranches
        ? branchesData.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];


    const onSubmit = async (data) => {
        await getSalesCategory(data).unwrap();
        setSearchData(data);
    }

    const calculateInvoiceSummary = useMemo(() => (invoices = []) => {
        return invoices?.reduce(
            (summary, invoice) => {
                summary.totalDiscount += invoice.DiscountV || 0;
                summary.totalGrandTotal += invoice.GrandTotal || 0;
                summary.totalSubTotal += invoice.Subtotal || 0;
                summary.totalTaxTotal += invoice.TaxV || 0;
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
            title={AppStrings.sales_category}
            icon={faChartPie}
            data={data}
            fields={reportFormFields}
            schema={invoiceByDateSchema}
            options={{ Warehouse: branches ? branches : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useSalesCategoryColDefs()}
            searchData={searchData}
        />
    )
}

export default CategoriesSales
