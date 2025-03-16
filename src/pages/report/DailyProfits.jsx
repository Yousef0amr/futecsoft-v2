import React from 'react'
import useBranchManagement from '../../hook/useBranchManagement';
import AppStrings from '../../config/appStrings';
import ListReport from './../../components/report/ListReport';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import {
    useLazyGetDailyProfitQuery
} from '../../features/reportsControllerSlice';
import { getDailyProfitReportFormFields } from '../../config/formFields';
import { useDailyProfitColDefs } from '../../config/agGridColConfig';
import useValidators from '../../hooks/useValidators';


const DailyProfits = () => {
    const { data: branchesData, isLoading: isLoadingBranches } = useBranchManagement();
    const [getDailyProfit, { data, isLoading }] = useLazyGetDailyProfitQuery();
    const { dailyProfitSchema } = useValidators()
    const [searchData, setSearchData] = React.useState({});
    const branches = !isLoadingBranches
        ? branchesData.map((item) => ({ value: item.BranchId, label: item.BranchNameAr }))
        : [];

    const onSubmit = async (data) => {
        await getDailyProfit(data).unwrap();
        setSearchData(data);
    }

    return (
        <ListReport
            title={AppStrings.daily_profit}
            icon={faChartLine}
            data={data}
            fields={getDailyProfitReportFormFields}
            schema={dailyProfitSchema}
            options={{ Warehouse: branches ? branches : [] }}
            onSubmit={onSubmit} isLoading={isLoading}
            useComponentsColDefs={useDailyProfitColDefs()}
            searchData={searchData}
        />
    )
}

export default DailyProfits
