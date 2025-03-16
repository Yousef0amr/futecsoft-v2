import React, { useMemo } from 'react'
import AppStrings from '../../config/appStrings';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useLazyGetFullSalesQuery } from '../../features/reportsControllerSlice';
import useValidators from '../../hooks/useValidators';
import useBranchManagement from '../../hook/useBranchManagement';
import ListReport from '../../components/report/ListReport';
import { useGetAllPosStationsQuery } from '../../features/posStationSlice';
import { getFullSalesReportFormFields } from '../../config/formFields';
import { useFullSalesColDefs } from '../../config/agGridColConfig';
import { useTranslation } from 'react-i18next';
const FullSales = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const { data: posStationsData, isLoading: isLoadingPosStations } = useGetAllPosStationsQuery();
    const [getFullSales, { data, isLoading }] = useLazyGetFullSalesQuery();
    const { salesItemSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});
    const { t } = useTranslation()

    const branches = !isLoadingBranches
        ? branchesData.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    let posStations = !isLoadingPosStations
        ? posStationsData.map((item) => ({ value: item.StationId, label: item.StationName }))
        : [];

    const onSubmit = async (data) => {
        await getFullSales(data).unwrap();
        setSearchData(data);
    }


    const calculateInvoiceSummary = useMemo(() => (invoices = []) => {

        return invoices?.reduce(
            (summary, invoice) => {
                summary.totalDiscount += invoice.Discount || 0;
                summary.totalGrandTotal += invoice.SALES || 0;
                summary.totalSubTotal += invoice.SubTotal || 0;
                summary.totalTaxTotal += invoice.TaxReturn || 0;

                summary.cashMoney += invoice.Payment0 || 0;
                summary.visa += invoice.Payment1 || 0;
                summary.returnValue += invoice.RETURN || 0;
                summary.invoiceCount += 1;
                return summary;
            },
            {
                invoiceCount: 0,
                totalSubTotal: 0,
                totalDiscount: 0,
                cashMoney: 0,
                visa: 0,
                returnValue: 0,
                totalTaxTotal: 0,
                totalGrandTotal: 0,
            }
        );
    }, []);


    return (
        <ListReport summary={
            calculateInvoiceSummary(data)
        }
            title={AppStrings.full_sales}
            icon={faChartLine}
            data={data}
            fields={getFullSalesReportFormFields}
            schema={salesItemSchema}
            options={{ Warehouse: branches ? branches : [], StationID: posStations ? [{ value: -1, label: t(AppStrings.all) }, ...posStations] : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useFullSalesColDefs()}
            searchData={searchData}
        />

    )
}

export default FullSales
